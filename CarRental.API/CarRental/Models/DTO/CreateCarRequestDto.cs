namespace CarRental.Models.DTO
{
    public class CreateCarRequestDto
    {
        public string Maker { get; set; }
        public string Model { get; set; }
        public string Features { get; set; }
        public int PricePerHour { get; set; }
        public bool isAvailable { get; set; } = true;
        public Guid[] Agreements { get; set; }
    }
}
