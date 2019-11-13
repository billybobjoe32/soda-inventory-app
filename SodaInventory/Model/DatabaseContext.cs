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

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer(@"Data Source=localhost;Initial Catalog=SodaInventoryDB;Integrated Security=True;");
		}
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Store>()
				.HasMany(s => s.ItemAlerts)
				.WithOne(i => i.Store)
				.OnDelete(DeleteBehavior.Cascade);
			modelBuilder.Entity<Store>()
				.HasMany(s => s.ItemQuantities)
				.WithOne(i => i.Store)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Item>()
				.HasMany(i => i.ItemAlerts)
				.WithOne(ia => ia.Item)
				.OnDelete(DeleteBehavior.SetNull);
			modelBuilder.Entity<Item>()
				.HasMany(i => i.ItemQuantities)
				.WithOne(iq => iq.Item)
				.OnDelete(DeleteBehavior.SetNull);
		}
	}
}