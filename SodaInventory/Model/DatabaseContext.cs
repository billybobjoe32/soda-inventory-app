using Microsoft.EntityFrameworkCore;

namespace SodaInventory.Model
{
	public class DatabaseContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Company> Companies { get; set; }
		public DbSet<Store> Stores { get; set; }
		public DbSet<Item> Items { get; set; }
		public DbSet<ItemAlert> ItemAlerts { get; set; }
		public DbSet<ItemQuantity> ItemQuantities { get; set; }

		public DatabaseContext(DbContextOptions options) : base(options)
		{
		}
	}
}