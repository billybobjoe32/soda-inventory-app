using System.ComponentModel.DataAnnotations;

namespace SodaInventory.Model
{
	public class User
	{
		[Key]
		[EmailAddress]
		public string Email { get; set; }
		[Required]
		public int CompanyId { get; set; }
		[Required]
		public string Password { get; set; }
		[Required]
		public UserType UserType { get; set; }

		public User()
		{
			
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