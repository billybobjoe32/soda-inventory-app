using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SodaInventory.Model;

namespace SodaInventory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemAlertsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ItemAlertsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/ItemAlerts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemAlert>>> GetItemAlerts()
        {
            return await _context.ItemAlerts.ToListAsync();
        }

        // GET: api/ItemAlerts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemAlert>> GetItemAlert(int id)
        {
            var itemAlert = await _context.ItemAlerts.FindAsync(id);

            if (itemAlert == null)
            {
                return NotFound();
            }

            return itemAlert;
        }

        // PUT: api/ItemAlerts/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemAlert(int id, ItemAlert itemAlert)
        {
            if (id != itemAlert.ItemAlertId)
            {
                return BadRequest();
            }

            _context.Entry(itemAlert).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemAlertExists(id))
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

        // POST: api/ItemAlerts
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ItemAlert>> PostItemAlert(ItemAlert itemAlert)
        {
            _context.ItemAlerts.Add(itemAlert);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItemAlert", new { id = itemAlert.ItemAlertId }, itemAlert);
        }

        // DELETE: api/ItemAlerts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ItemAlert>> DeleteItemAlert(int id)
        {
            var itemAlert = await _context.ItemAlerts.FindAsync(id);
            if (itemAlert == null)
            {
                return NotFound();
            }

            _context.ItemAlerts.Remove(itemAlert);
            await _context.SaveChangesAsync();

            return itemAlert;
        }

        private bool ItemAlertExists(int id)
        {
            return _context.ItemAlerts.Any(e => e.ItemAlertId == id);
        }
    }
}
