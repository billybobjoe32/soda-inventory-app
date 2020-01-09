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
	}
}
