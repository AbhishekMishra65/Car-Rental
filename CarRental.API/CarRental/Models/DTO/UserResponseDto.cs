using CarRental.Models.Domain;

namespace CarRental.Models.DTO
{
    public class UserResponseDto
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }

        public List<RentalAgreementDto> Agreements { get; set; } = new List<RentalAgreementDto>();
    }
}
