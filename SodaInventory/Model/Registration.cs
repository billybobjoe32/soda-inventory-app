using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SodaInventory.Model
{
    public class Registration
    {
        [DatabaseGenerated((DatabaseGeneratedOption.Identity))]
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string RegistrationCode { get; set; }
    }
}