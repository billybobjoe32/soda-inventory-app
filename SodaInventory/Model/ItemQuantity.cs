using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SodaInventory.Model
{
	public class ItemQuantity
	{
		public int ItemQuantityId { get; set; }
		public int? ItemId { get; set; }
		public int? StoreId { get; set; }
		public decimal Amount { get; set; }
		public decimal ModerateLevel { get; set; }
		public decimal UrgentLevel { get; set; }
		public DateTime? LastUpdated { get; set; }

		public override bool Equals(object obj)
		{
			if (obj == null || !this.GetType().Equals(obj.GetType()))
			{
				return false;
			}
			ItemQuantity item = (ItemQuantity)obj;
			return (item.ItemQuantityId == this.ItemQuantityId &&
					item.ItemId == this.ItemId &&
					item.StoreId == this.StoreId &&
					item.Amount == this.Amount &&
					item.ModerateLevel == this.ModerateLevel &&
					item.UrgentLevel == this.UrgentLevel &&
					item.LastUpdated == this.LastUpdated);
		}
	}
}