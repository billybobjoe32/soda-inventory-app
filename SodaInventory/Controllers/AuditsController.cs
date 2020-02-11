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
    public class AuditsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public AuditsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Audits
        [HttpGet]
        [Route("GetItemAudits")]
        public async Task<ActionResult<IEnumerable<Audit>>> GetItemAudits(int companyId, int itemId)
        {
            return await _context.Audits
                .Where(a => a.TableName == "Items"
                && a.NewValues.Contains($"\"CompanyId\":{companyId}")
                && a.NewValues.Contains($"\"ItemId\":{itemId}"))
                .ToListAsync();
        }

        // GET: api/Audits
        [HttpGet]
        [Route("GetItemQuantityAudits")]
        public async Task<ActionResult<IEnumerable<Audit>>> GetItemQuantityAudits(int storeId, int itemId)
        {
            return await _context.Audits
                .Where(a => a.TableName == "ItemQuantities" 
                && a.NewValues.Contains($"\"StoreId\":{storeId}") 
                && a.NewValues.Contains($"\"ItemId\":{itemId}"))
                .ToListAsync();
        }
    }
}
