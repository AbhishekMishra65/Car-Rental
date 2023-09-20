using CarRental.Models.Domain;

namespace CarRental.Repositories.Interfaces
{
    public interface IRentalAgreementRepository
    {
        Task<RentalAgreement> CreateRentalAgreementAsync(RentalAgreement rentalAgreement);
        Task<IEnumerable<RentalAgreement>> GetAllRentalAgreementAsync();
        Task<IEnumerable<RentalAgreement>> GetUserAgreementsAsync(int userId);
        Task<IEnumerable<RentalAgreement>> GetCarAgreementsAsync(Guid CarVehicleId); 
        Task<RentalAgreement?> UpdateAgreementAsync(RentalAgreement rentalAgreement);
        Task<RentalAgreement?> GetAgreementByIdAsync(Guid AgreementId);
    }
}
