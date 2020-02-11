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
