using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SodaInventory.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaInventory.Controllers
{
	[Route("api/[controller]")]
    [ApiController]
    public class ItemQuantitiesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ItemQuantitiesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/ItemQuantities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemQuantity>>> GetItemQuantities(int itemId)
        {
            return await _context.ItemQuantities.Where(iq => iq.Item.ItemId == itemId).ToListAsync();
        }

        // GET: api/ItemQuantities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemQuantity>> GetItemQuantity(int id)
        {
            var itemQuantity = await _context.ItemQuantities.FindAsync(id);

            if (itemQuantity == null)
            {
                return NotFound();
            }

            return itemQuantity;
        }

        // PUT: api/ItemQuantities/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemQuantity(int id, ItemQuantity itemQuantity)
        {
            if (id != itemQuantity.ItemQuantityId)
            {
                return BadRequest();
            }

            _context.Entry(itemQuantity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemQuantityExists(id))
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

        // POST: api/ItemQuantities
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ItemQuantity>> PostItemQuantity(ItemQuantity itemQuantity)
        {
            _context.ItemQuantities.Add(itemQuantity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItemQuantity", new { id = itemQuantity.ItemQuantityId }, itemQuantity);
        }

        // DELETE: api/ItemQuantities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ItemQuantity>> DeleteItemQuantity(int id)
        {
            var itemQuantity = await _context.ItemQuantities.FindAsync(id);
            if (itemQuantity == null)
            {
                return NotFound();
            }

            _context.ItemQuantities.Remove(itemQuantity);
            await _context.SaveChangesAsync();

            return itemQuantity;
        }

        private bool ItemQuantityExists(int id)
        {
            return _context.ItemQuantities.Any(e => e.ItemQuantityId == id);
        }
    }
}
