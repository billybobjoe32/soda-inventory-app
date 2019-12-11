using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SodaInventory.Model
{
	public class Company
	{
		public int CompanyId { get; set; }
		public string CompanyName { get; set; }
		public virtual ICollection<Store> Stores { get; set; }
		public virtual ICollection<Item> Items { get; set; }
		public virtual ICollection<User> Users { get; set; }

		public Company()
		{
			CompanyId = 0;
			Stores = new List<Store>();
			Items = new List<Item>();
			Users = new List<User>();
		}
	}
}
