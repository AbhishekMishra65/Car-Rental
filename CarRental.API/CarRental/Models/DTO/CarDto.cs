namespace CarRental.Models.DTO
{
    public class CarDto
    {
        public Guid VehicleId { get; set; }
        public string Maker { get; set; }
        public string Model { get; set; }
        public string Features { get; set; }
        public int PricePerHour { get; set; }
        public bool isAvailable { get; set; } = true;
        public List<RentalAgreementDto> Agreements { get; set; } = new List<RentalAgreementDto>();
    }
}
