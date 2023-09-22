using CarRental.Models.Domain;

namespace CarRental.Repositories.Interfaces
{
    public interface ICarRepository
    {
        Task<Car> AddCarAsync(Car car);
        Task<IEnumerable<Car>> GetAllCarsAsync();
        Task<Car> GetCarByIdAsync(Guid VehicleId);
        Task<Car?> EditCarAsync(Car car);
        Task<Car?> DeleteCarAsync(Guid VehicleId);
    }
}
