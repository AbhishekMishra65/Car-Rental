using CarRental.DataContext;
using CarRental.Models.Domain;
using CarRental.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Repositories.Implementation
{
    public class RentalAgreementRepository : IRentalAgreementRepository
    {
        private readonly CarRentalDbContext dbContext;
        public RentalAgreementRepository(CarRentalDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<RentalAgreement> CreateRentalAgreementAsync(RentalAgreement rentalAgreement)
        {
            await dbContext.Agreements.AddAsync(rentalAgreement);
            await dbContext.SaveChangesAsync();
            return rentalAgreement;
        }

        public async Task<RentalAgreement?> GetAgreementByIdAsync(Guid AgreementId)
        {
            return await dbContext.Agreements.FirstOrDefaultAsync(x => x.AgreementId == AgreementId);
        }

        public async Task<IEnumerable<RentalAgreement>> GetAllRentalAgreementAsync()
        {
            return await dbContext.Agreements.ToListAsync();
        }

        public async Task<IEnumerable<RentalAgreement>> GetCarAgreementsAsync(Guid CarVehicleId)
        {
            return await dbContext.Agreements.Where(x => x.CarVehicleId == CarVehicleId).ToListAsync();
        }

        public async Task<IEnumerable<RentalAgreement>> GetUserAgreementsAsync(int userId)
        {
            return await dbContext.Agreements.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<RentalAgreement?> UpdateAgreementAsync(RentalAgreement rentalAgreement)
        {
            var existingAgreement = await dbContext.Agreements
                .FirstOrDefaultAsync(x => x.AgreementId == rentalAgreement.AgreementId);

            if (existingAgreement == null)
            {
                return null;
            }

            // Update BlogPost
            dbContext.Entry(existingAgreement).CurrentValues.SetValues(rentalAgreement);

            

            await dbContext.SaveChangesAsync();

            return rentalAgreement;
        }
    }
} 
