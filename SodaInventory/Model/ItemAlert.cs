namespace SodaInventory.Model
{
	public class ItemAlert
	{
		public int ItemAlertId { get; set; }
		public Item Item { get; set; }
		public Store Store { get; set; }
		public decimal ModerateLevel { get; set; }
		public decimal UrgentLevel { get; set; }
	}
}
