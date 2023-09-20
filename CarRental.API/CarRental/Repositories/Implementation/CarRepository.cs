using CarRental.DataContext;
using CarRental.Models.Domain;
using CarRental.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Repositories.Implementation
{
    public class CarRepository : ICarRepository
    {
        private readonly CarRentalDbContext dbContext;

        public CarRepository(CarRentalDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Car> AddCarAsync(Car car)
        {
            await dbContext.Cars.AddAsync(car);
            await dbContext.SaveChangesAsync();
            return car;
        }

        public async Task<IEnumerable<Car>> GetAllCarsAsync()
        {
            return await dbContext.Cars.Include(x => x.Agreements).ToListAsync();
        }

        public async Task<Car> GetCarByIdAsync(Guid VehicleId)
        {
            return await dbContext.Cars.Include(x => x.Agreements).FirstOrDefaultAsync(x => x.VehicleId == VehicleId);
        }
    }
}
