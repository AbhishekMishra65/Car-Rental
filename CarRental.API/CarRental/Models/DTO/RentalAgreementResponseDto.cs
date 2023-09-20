namespace CarRental.Models.DTO
{
    public class RentalAgreementResponseDto
    {
        public Guid AgreementId { get; set; }
        public Guid CarVehicleId { get; set; }
        public int UserId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public double TotalPrice { get; set; }
        public bool returnRequested { get; set; } = false;
        public bool adminConfirmReturned { get; set; } = false;
    }
}
