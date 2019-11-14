using System.ComponentModel.DataAnnotations;

namespace SodaInventory.Model
{
	public class User
	{
		[Key]
		public string Email { get; set; }
		[Required]
		public Company Company { get; set; }
		[Required]
		public string Password { get; set; }
		[Required]
		public UserType UserType { get; set; }

		public User()
		{
			Company = new Company();
		}
	}

	public enum UserType
	{
		None = 0,
		Admin = 1,
		Manager = 2,
		ShiftLead = 3
	}
}