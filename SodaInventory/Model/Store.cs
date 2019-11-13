using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SodaInventory.Model
{
	public class Store
	{
		public int StoreId { get; set; }
		[Required]
		public Company Company { get; set; }
		[Required]
		public string StoreName { get; set; }
		public string StreetAddress { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public short ZipCode { get; set; }

		public List<ItemAlert> ItemAlerts { get; set; }
		public List<ItemQuantity> ItemQuantities { get; set; }

		public Store()
		{
			ItemAlerts = new List<ItemAlert>();
			ItemQuantities = new List<ItemQuantity>();
			Company = new Company();
		}
	}
}