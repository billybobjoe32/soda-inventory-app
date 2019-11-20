using System.ComponentModel.DataAnnotations;

namespace SodaInventory.Model
{
	public class ItemQuantity
	{
		public int ItemQuantityId { get; set; }
		public int? ItemId { get; set; }
		public int? StoreId { get; set; }
		public decimal Amount { get; set; }
	}
}
