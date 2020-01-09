using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SodaInventory.Model
{
	public class Store
	{
		[Key]
		public int StoreId { get; set; }
		[Required]
		public int CompanyId { get; set; }
		[Required]
		public string StoreName { get; set; }
		public string StreetAddress { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public int ZipCode { get; set; }

		public Store()
		{
			
		}
	}
}