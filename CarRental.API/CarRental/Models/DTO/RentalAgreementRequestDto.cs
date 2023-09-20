using System.Xml.Schema;

namespace CarRental.Models.DTO
{
    public class RentalAgreementRequestDto
    {
        public string Email { get; set; }
        public Guid CarVehicleId { get; set;}
        public DateTime FromDate{ get; set;}
        public DateTime ToDate{ get; set;}

        //public double TotalPrice {  get; set;}
        //public bool returnRequested {  get; set;}
    }
}
