using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarRental.Models.Domain
{
    public class RentalAgreement
    {
        [Key]
        public Guid AgreementId { get; set; }
        public int UserId { get; set; }
        //public Guid VehicleId { get; set; } 

        public Guid CarVehicleId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public double TotalPrice { get; set; }
        public bool returnRequested { get; set; } = false;
        public bool adminConfirmReturned { get; set; } = false;
    }
}
