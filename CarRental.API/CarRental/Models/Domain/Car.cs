using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CarRental.Models.Domain
{
    public class Car
    {
        [Key]
        public Guid VehicleId { get; set; }
        public string Maker {  get; set; }
        public string Model { get; set; }
        public int PricePerHour { get; set; } 
        public string Features { get; set; }
        public bool isAvailable { get; set; } = true;
        public ICollection<RentalAgreement> Agreements { get; set; }
    }
}
