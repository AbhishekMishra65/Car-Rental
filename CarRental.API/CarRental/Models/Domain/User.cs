using System.ComponentModel.DataAnnotations;

namespace CarRental.Models.Domain
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
        public ICollection<RentalAgreement> Agreements { get; set; }
    }
}
