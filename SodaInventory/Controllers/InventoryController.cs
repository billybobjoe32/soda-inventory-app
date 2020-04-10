using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet]
        [Route("GetSpecificInventoryItem")]
        public async Task<ActionResult<InventoryEntry>> GetSpecificInventoryItem(int storeId, int itemId)
        {
            Item item = await _context.Items.FindAsync(itemId);
            List<ItemQuantity> iq = await _context.ItemQuantities.Where(iq => iq.ItemId == itemId && iq.StoreId == storeId).ToListAsync();
            if (iq.Count == 0 || item == null) return null;
            return new InventoryEntry(item, iq[0]);
        }

        [HttpPut]
        [Route("UpdateItemInfo")]
        public async Task<IActionResult> UpdateItemInfo(InventoryEntry ie)
        {
            if (ie.ItemId == 0 && ie.ItemQuantityId == 0) return BadRequest();

            Item currentItem = await _context.Items.FindAsync(ie.ItemId);
            ItemQuantity currentIq = await _context.ItemQuantities.FindAsync(ie.ItemQuantityId);

            if (currentItem == null || currentIq == null) return NotFound();

            Item postedItem = ie.ToItem();
            postedItem.CompanyId = currentItem.CompanyId;
            _context.Entry(postedItem).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            ItemQuantity postedQuantity = ie.ToItemQuantity();
            postedQuantity.Amount = currentIq.Amount;
            postedQuantity.LastUpdated = currentIq.LastUpdated;
            postedQuantity.ItemId = currentIq.ItemId;
            postedQuantity.StoreId = currentIq.StoreId;

            _context.Entry(postedQuantity).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return NoContent();
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
                    items.CompanyId,
                    itemQty.ItemId,
                    itemQty.ItemQuantityId,
                    itemQty.StoreId,
                    items.ItemName,
                    items.Units,
                    itemQty.Amount,
                    itemQty.ModerateLevel,
                    itemQty.UrgentLevel,
                    itemQty.LastUpdated
                }
                )
                .Where(item => item.StoreId == storeId)
                .GroupBy(item => new { 
                    item.CompanyId, 
                    item.ItemId, 
                    item.ItemQuantityId,
                    item.StoreId,
                    item.ItemName,
                    item.Units,
                    item.Amount,
                    item.ModerateLevel, 
                    item.UrgentLevel,
                    item.LastUpdated})
                .Select(item => new {
                    CompanyId = item.Key.CompanyId,
                    ItemId = item.Key.ItemId ?? default,
                    ItemQuantityId = item.Key.ItemQuantityId,
                    StoreId = item.Key.StoreId ?? default,
                    ItemName = item.Key.ItemName,
                    Uom = item.Key.Units,
                    Amount = item.Key.Amount,//Amount = item.Sum(item => item.Amount),
                    ModerateLevel = item.Key.ModerateLevel,
                    UrgentLevel = item.Key.UrgentLevel,
                    LastUpdated = item.Key.LastUpdated
                })
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<InventoryEntry>> PostInventoryEntry(InventoryEntry ie)
        {
            bool itemCreated = false;
            if (ie.ItemId == 0)
            {
                itemCreated = true;
                _context.Items.Add(ie.ToItem());
                await _context.SaveChangesAsync();
            }
            else
            {
                var currentItem = await _context.Items.FindAsync(ie.ItemId);
                Item postedItem = ie.ToItem();
                if (currentItem != null && !currentItem.Equals(postedItem))
                {
                    _context.Entry(postedItem).State = EntityState.Modified;
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!ItemExists(currentItem.ItemId))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }
            }
            if (!ie.LastUpdated.HasValue)
            {
                ie.LastUpdated = DateTime.UtcNow;
            }
            if (ie.ItemQuantityId == 0)
            {
                itemCreated = true;
                _context.ItemQuantities.Add(ie.ToItemQuantity());
                await _context.SaveChangesAsync();
            }
            else
            {
                var currentItemQuantity = await _context.ItemQuantities.FindAsync(ie.ItemQuantityId);
                ItemQuantity postedIq = ie.ToItemQuantity();
                if (currentItemQuantity != null && !currentItemQuantity.Equals(postedIq))
                {
                    _context.Entry(postedIq).State = EntityState.Modified;
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!ItemQuantityExists(currentItemQuantity.ItemQuantityId))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }
            }
            return CreatedAtAction("GetInventoryEntry", new { id = ie.ItemId }, ie);
        }

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.ItemId == id);
        }

        private bool ItemQuantityExists(int id)
        {
            return _context.ItemQuantities.Any(e => e.ItemQuantityId == id);
        }

        [HttpGet]
        [Route("GetAllInventoryItems")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllItems(int companyId, int storeId)
        {
            List<object> returningQuantities = new List<object>();
            List<Item> items = await _context.Items.Where(i => i.CompanyId == companyId).OrderBy(item => item.ItemName).ToListAsync();
            foreach (Item i in items)
            {
                List<ItemQuantity> itemQuantities = await _context.ItemQuantities.Where(iq => iq.ItemId == i.ItemId && iq.StoreId == storeId).ToListAsync();
                if (itemQuantities.Count > 0)
                {
                    returningQuantities.Add(new
                    {
                        StoreId = storeId,
                        ItemId = i.ItemId,
                        ItemName = i.ItemName
                    });
                }
                else
                {
                    returningQuantities.Add(new
                    {
                        StoreId = 0,
                        ItemId = i.ItemId,
                        ItemName = i.ItemName
                    });
                }
            }
            return returningQuantities;
        }
    }
}
