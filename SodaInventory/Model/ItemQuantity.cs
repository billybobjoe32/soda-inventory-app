namespace SodaInventory.Model
{
	public class ItemQuantity
	{
		public int ItemQuantityId { get; set; }
		public Item Item { get; set; }
		public Store Store { get; set; }
		public decimal Amount { get; set; }
	}
}
