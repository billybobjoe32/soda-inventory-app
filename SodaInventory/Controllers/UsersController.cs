﻿using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SodaInventory.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace SodaInventory.Controllers
{
	[Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public UsersController(DatabaseContext context)
        {
            _context = context;
		}

		// GET: api/Users/5
		[HttpGet]
		[Route("GetUsersForCompany")]
		public async Task<ActionResult<IEnumerable<User>>> GetUsersForCompany(int companyId)
		{
			return await _context.Users.Where(u => u.CompanyId == companyId).ToListAsync();
		}

		// GET: api/Users
		[HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet]
		[Route("CheckAuthorized")]
        public async Task<ActionResult<User>> GetUser(string email, string password)
        {
			var user = await _context.Users.FindAsync(email);

			if (user == null)
			{
				return NotFound();
			}
			if(user.Password != password)
			{
				return Unauthorized();
			}

			return user;
		}

		// PUT: api/Users/5
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for
		// more details see https://aka.ms/RazorPagesCRUD.
		[HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.Email)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.Email }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Email == id);
        }

        [HttpPost("login")]
        public Object Login([FromBody] JObject login)
        {
            var user = _context.Users.Find(login["email"].ToObject<String>());
            string token = null;
            if (user?.Password == login["password"].ToObject<String>())
            {
                token = System.Guid.NewGuid().ToString();
                Authentication.TokenList.Add(token);
            }

            return new
            {
                token = token,
                companyId = user?.CompanyId
            };
        }

        [HttpPost("logout")]
        public void Logout([FromBody] JObject token)
        {
            Authentication.TokenList.Remove(token["token"].ToObject<String>());
        }
    }
}
