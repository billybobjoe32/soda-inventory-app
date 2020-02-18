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

        // POST: api/finalize
        [HttpPost("finalize")]
        public void Finalize([FromBody]JObject registerUserMap)
        {
            var registrations = from registration in _context.Registrations select registration;
            registrations = registrations.Where(s => s.RegistrationCode.Equals(registerUserMap["token"].ToObject<String>()));
            var registrationObject = registrations.ToList()[0];
            
            var company = new Company {CompanyName = registrationObject.CompanyName};
            _context.Companies.Add(company);
            _context.SaveChanges();

            var user = new User
            {
                Email = registrationObject.Email,
                Password = registerUserMap["password"].ToObject<String>(),
                CompanyId = company.CompanyId
            };
            _context.Users.Add(user);
            _context.SaveChanges();
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