using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaInventory.Model
{
	public class InventoryEntry
	{
		public int CompanyId;
		public int? StoreId;
		public int ItemId;
		public string ItemName;
		public string Uom;
		public int ItemQuantityId;
		public decimal Amount;
		public decimal ModerateLevel;
		public decimal UrgentLevel;
		public DateTime? LastUpdated;

		public InventoryEntry(Item item, ItemQuantity iq)
		{
			this.CompanyId = item.CompanyId;
			this.StoreId = iq.StoreId;
			this.ItemId = item.ItemId;
			this.ItemName = item.ItemName;
			this.Uom = item.Units;
			this.ItemQuantityId = iq.ItemQuantityId;
			this.Amount = iq.Amount;
			this.ModerateLevel = iq.ModerateLevel;
			this.UrgentLevel = iq.UrgentLevel;
			this.LastUpdated = iq.LastUpdated;
		}

		public ItemQuantity ToItemQuantity()
		{
			return new ItemQuantity
			{
				StoreId = this.StoreId,
				ItemId = this.ItemId,
				ItemQuantityId = this.ItemQuantityId,
				Amount = this.Amount,
				ModerateLevel = this.ModerateLevel,
				UrgentLevel = this.UrgentLevel,
				LastUpdated = this.LastUpdated
			};
		}

		public Item ToItem()
		{
			return new Item
			{
				CompanyId = this.CompanyId,
				ItemId = this.ItemId,
				ItemName = this.ItemName,
				Units = this.Uom
			};
		}
	}
}
