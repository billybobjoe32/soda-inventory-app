namespace SodaInventory.Model
{
	public class ItemAlert
	{
		public int ItemAlertId { get; set; }
		public int? ItemId { get; set; }
		public int? StoreId { get; set; }
		public decimal ModerateLevel { get; set; }
		public decimal UrgentLevel { get; set; }
	}
}
