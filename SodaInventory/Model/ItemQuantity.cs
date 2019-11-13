using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace SodaInventory.Model
{
	public class ItemQuantity
	{
		public int ItemQuantityId { get; set; }
		public Item Item { get; set; }
		[Required]
		public Store Store { get; set; }
		public decimal Amount { get; set; }
	}
}
