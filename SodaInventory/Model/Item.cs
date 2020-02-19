using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SodaInventory.Model
{
	public class Item
	{
		public int ItemId { get; set; }
		[Required]
		public int CompanyId { get; set; }
		public string ItemName { get; set; }
		public string Units { get; set; }

		public virtual ICollection<ItemQuantity> ItemQuantities { get; set; }

		public Item()
		{
			ItemQuantities = new List<ItemQuantity>();
		}

		public override bool Equals(object obj)
		{
			if(obj == null || !this.GetType().Equals(obj.GetType()))
			{
				return false;
			}
			Item item = (Item)obj;
			return (item.ItemId == this.ItemId &&
					item.CompanyId == this.CompanyId &&
					item.ItemName == this.ItemName &&
					item.Units == this.Units);
		}
	}
}
