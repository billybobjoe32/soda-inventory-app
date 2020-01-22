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
    public class InventoryController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public InventoryController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/GetInventory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetInventory(int storeId)
        { 
            return await _context.ItemQuantities.Join(
                _context.Items,
                items => items.ItemId,
                itemQty => itemQty.ItemId,
                (itemQty, items) => new
                {
                    itemQty.ItemId,
                    items.ItemName,
                    itemQty.Amount,
                    itemQty.ModerateLevel,
                    itemQty.UrgentLevel,
                    Uom = items.Units,
                    itemQty.StoreId
                }
                )
                .Where(item => item.StoreId == storeId)
                .GroupBy(item => new { item.ItemId, item.Uom , item.ModerateLevel, item.UrgentLevel, item.ItemName})
                .Select(item => new Inventory {
                    ItemId = item.Key.ItemId ?? default,
                    Amount = item.Sum(item => item.Amount),
                    Uom = item.Key.Uom,
                    ModerateLevel = item.Key.ModerateLevel,
                    UrgentLevel = item.Key.UrgentLevel,
                    ItemName = item.Key.ItemName
                })
                .ToListAsync();
        }
    }
}
