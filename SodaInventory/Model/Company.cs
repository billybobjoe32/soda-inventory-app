using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SodaInventory.Model
{
	public class Company
	{
		public int CompanyId { get; set; }
		[Required]
		public string CompanyName { get; set; }
		public List<Store> Stores { get; set; }
		public List<Item> Items { get; set; }

		public Company()
		{
			CompanyId = 0;
			Stores = new List<Store>();
			Items = new List<Item>();
		}
	}
}
