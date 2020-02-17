using System;
using Microsoft.AspNetCore.Mvc;
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

        // GET: api/register
        [HttpPost("registrant")]
        public void Register([FromBody]JObject registrantMap)
        {
            Emailer emailer = new Emailer(registrantMap["email"].ToObject<String>());
            emailer.sendEmail();
        }
    }
}