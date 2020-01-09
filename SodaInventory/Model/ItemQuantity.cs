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
	}
}