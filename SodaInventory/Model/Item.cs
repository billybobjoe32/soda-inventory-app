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

		public List<ItemAlert> ItemAlerts { get; set; }
		public List<ItemQuantity> ItemQuantities { get; set; }

		public Item()
		{
			ItemAlerts = new List<ItemAlert>();
			ItemQuantities = new List<ItemQuantity>();
		}
	}
}
