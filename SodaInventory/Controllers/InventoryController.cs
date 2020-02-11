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
        public async Task<ActionResult<IEnumerable<InventoryEntry>>> GetInventory(int storeId)
        { 
            return await _context.ItemQuantities.Join(
                _context.Items,
                items => items.ItemId,
                itemQty => itemQty.ItemId,
                (itemQty, items) => new
                {
                    items.CompanyId,
                    itemQty.ItemId,
                    items.ItemName,
                    itemQty.Amount,
                    itemQty.ModerateLevel,
                    itemQty.UrgentLevel,
                    Uom = items.Units,
                    itemQty.ItemQuantityId,
                    itemQty.LastUpdated,
                    itemQty.StoreId
                }
                )
                .Where(item => item.StoreId == storeId)
                .GroupBy(item => new { 
                    item.CompanyId, 
                    item.ItemId, 
                    item.ItemQuantityId,
                    item.LastUpdated,
                    item.Uom , 
                    item.ModerateLevel, 
                    item.UrgentLevel, 
                    item.ItemName, 
                    item.StoreId})
                .Select(item => new InventoryEntry{
                    CompanyId = item.Key.CompanyId,
                    StoreId = item.Key.StoreId ?? default,
                    ItemId = item.Key.ItemId ?? default,
                    ItemName = item.Key.ItemName,
                    Uom = item.Key.Uom,
                    ItemQuantityId = item.Key.ItemQuantityId,
                    Amount = item.Sum(item => item.Amount),
                    ModerateLevel = item.Key.ModerateLevel,
                    UrgentLevel = item.Key.UrgentLevel,
                    LastUpdated = item.Key.LastUpdated
                })
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<InventoryEntry>> PostInventoryEntry(InventoryEntry ie)
        {
            if (ie.ItemId == 0)
            {
                _context.Items.Add(ie.ToItem());
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetItem", new { id = ie.ItemId }, ie.ToItem());
            }
            else
            {
                var currentItem = await _context.Items.FindAsync(ie.ItemId);
                if (currentItem != null)
                {
                    _context.Entry(ie.ToItem()).State = EntityState.Modified;
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
            if (ie.ItemQuantityId == 0)
            {
                _context.ItemQuantities.Add(ie.ToItemQuantity());
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetItemQuantity", new { id = ie.ItemQuantityId }, ie.ToItemQuantity());
            }
            else
            {
                var currentItemQuantity = await _context.ItemQuantities.FindAsync(ie.ItemQuantityId);
                if (currentItemQuantity != null)
                {
                    _context.Entry(ie.ToItemQuantity()).State = EntityState.Modified;
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

            return NoContent();
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
        public async Task<ActionResult<IEnumerable<InventoryEntry>>> GetAllItems(int companyId, int storeId)
        {
            List<InventoryEntry> returningQuantities = new List<InventoryEntry>();
            List<Item> items = await _context.Items.Where(i => i.CompanyId == companyId).OrderBy(item => item.ItemName).ToListAsync();
            foreach (Item i in items)
            {
                List<ItemQuantity> itemQuantities = await _context.ItemQuantities.Where(iq => iq.ItemId == i.ItemId && iq.StoreId == storeId).ToListAsync();
                if (itemQuantities.Count > 0)
                {
                    returningQuantities.Add(new InventoryEntry
                    {
                        StoreId = storeId,
                        ItemId = i.ItemId,
                        ItemName = i.ItemName
                    });
                }
                else
                {
                    returningQuantities.Add(new InventoryEntry
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
