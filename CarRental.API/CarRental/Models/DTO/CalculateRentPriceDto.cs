namespace CarRental.Models.DTO
{
    public class CalculateRentPriceDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public Double PricePerHour { get; set; }
    }
}
