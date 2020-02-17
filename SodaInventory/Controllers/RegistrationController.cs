using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json.Linq;
using SodaInventory.Model;

namespace SodaInventory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private static int count = 0;
        private readonly DatabaseContext _context;

        public RegistrationController(DatabaseContext context)
        {
            _context = context;
        }

        // POST: api/registrant
        [HttpPost("registrant")]
        public void Register([FromBody]JObject registrantMap)
        {
            Registration registration = new Registration();
            registration.Email = registrantMap["email"].ToObject<String>();
            registration.CompanyName = registrantMap["company"].ToObject<String>();
            registration.RegistrationCode = System.Guid.NewGuid().ToString();
            Emailer emailer = new Emailer();
            emailer.sendEmail(registration);
            
            _context.Registrations.Add(registration);
            _context.SaveChanges();
        }

        // GET: api/finalize
        [HttpPost("finalize/{token}")]
        public void Finalize(String token)
        {
            // Add password to the api call
            Console.WriteLine("Registering User" + count++);
        }

        // GET: api/validate
        [HttpGet("validate/{token}")]
        public Boolean Validate(String token)
        {
            var registrations = from registration in _context.Registrations select registration;
            registrations = registrations.Where(s => s.RegistrationCode.Equals(token));
            
            return registrations.ToList().Count > 0;
        }
    }
}