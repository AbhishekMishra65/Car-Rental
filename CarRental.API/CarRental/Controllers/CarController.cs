using CarRental.Models.Domain;
using CarRental.Models.DTO;
using CarRental.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace CarRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarRepository carRepository;
        private readonly IRentalAgreementRepository rentalAgreementRepository;

        public CarController(ICarRepository carRepository, IRentalAgreementRepository rentalAgreementRepository)
        {
            this.carRepository = carRepository;
            this.rentalAgreementRepository = rentalAgreementRepository;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddCar([FromBody] CreateCarRequestDto request)
        {
            //convert DTO to Domain Model
            var car = new Car
            {
                Maker = request.Maker,
                Model = request.Model,
                Features = request.Features,
                PricePerHour = request.PricePerHour,
                isAvailable = request.isAvailable,
                Agreements = new List<RentalAgreement>()
            };

            car = await carRepository.AddCarAsync(car);

            //convert Domain model back to DTO
            var response = new CarDto
            {
                VehicleId = car.VehicleId,
                Model = car.Model,
                Maker = car.Maker,
                Features = car.Features,
                PricePerHour = car.PricePerHour,
                isAvailable = car.isAvailable,
                Agreements = car.Agreements.Select(x => new RentalAgreementDto
                {
                    AgreementId = x.AgreementId,
                    CarVehicleId = x.CarVehicleId,
                    UserId = x.UserId,
                    FromDate = x.FromDate,
                    ToDate = x.ToDate,
                    TotalPrice = x.TotalPrice,
                    returnRequested = x.returnRequested,
                    adminConfirmReturned = x.adminConfirmReturned
                }).ToList()
            };

            return Ok(response);
        }


        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("GetAllCar")]
        public async Task<IActionResult> GetAllCars()
        {
            var cars = await carRepository.GetAllCarsAsync();

            //convert domain model back to DTO
            var response = new List<CarDto>();

            foreach (var car in cars)
            {
                response.Add(new CarDto
                {
                    VehicleId = car.VehicleId,
                    Model = car.Model,
                    Maker = car.Maker,
                    Features = car.Features,
                    PricePerHour = car.PricePerHour,
                    isAvailable = car.isAvailable,
                    Agreements = car.Agreements.Select(x => new RentalAgreementDto
                    {
                        AgreementId = x.AgreementId,
                        CarVehicleId = x.CarVehicleId,
                        UserId = x.UserId,
                        FromDate = x.FromDate,
                        ToDate = x.ToDate,
                        TotalPrice = x.TotalPrice,
                        returnRequested = x.returnRequested,
                        adminConfirmReturned = x.adminConfirmReturned
                    }).ToList()
                });
            }
            return Ok(response);
        }


        [HttpGet]
        [Route("AvailableCar")]
        public async Task<IActionResult> GetAvailableCars()
        {
            var cars = await carRepository.GetAllCarsAsync();

            //convert domain model back to DTO
            var response = new List<CarDto>();

            foreach (var car in cars)
            {
                //send vehicleId to a fucntion such that it will fetch all the agreement in agreements variable...
                //then loop through all agreement and check Todate<DateTime.Now...
                //if true then return true else return false

                bool carAvailable = await CarAvailable(car.VehicleId);

                if (carAvailable)
                {
                    response.Add(new CarDto
                    {
                        VehicleId = car.VehicleId,
                        Model = car.Model,
                        Maker = car.Maker,
                        Features = car.Features,
                        PricePerHour = car.PricePerHour,
                        isAvailable = car.isAvailable,
                        Agreements = car.Agreements.Select(x => new RentalAgreementDto
                        {
                            AgreementId = x.AgreementId,
                            CarVehicleId = x.CarVehicleId,
                            UserId = x.UserId,
                            FromDate = x.FromDate,
                            ToDate = x.ToDate,
                            TotalPrice = x.TotalPrice,
                            returnRequested = x.returnRequested,
                            adminConfirmReturned =x.adminConfirmReturned
                        }).ToList()
                    });
                }
            }
            return Ok(response);
        }

        private async Task<bool> CarAvailable(Guid CarVehicleId)
        {
            var agreements = await rentalAgreementRepository.GetCarAgreementsAsync(CarVehicleId);

            foreach (var agreement in agreements)
            {
                if ((agreement.ToDate > DateTime.Now) && (agreement.FromDate < DateTime.Now))
                {
                    return false;
                }
            }
            return true;
        }

        [HttpGet]
        [Route("GetCar/{VehicleId:Guid}")]
        public async Task<IActionResult> GetCarById([FromRoute] Guid VehicleId)
        {
            var car = await carRepository.GetCarByIdAsync(VehicleId);

            //convert domain model back to DTO
            var response = new CarDto
            {
                VehicleId = car.VehicleId,
                Model = car.Model,
                Maker = car.Maker,
                Features = car.Features,
                PricePerHour = car.PricePerHour,
                isAvailable = car.isAvailable,
                Agreements = car.Agreements.Select(x => new RentalAgreementDto
                {
                    AgreementId = x.AgreementId,
                    CarVehicleId = x.CarVehicleId,
                    UserId = x.UserId,
                    FromDate = x.FromDate,
                    ToDate = x.ToDate,
                    TotalPrice = x.TotalPrice,
                    returnRequested = x.returnRequested,
                    adminConfirmReturned =x.adminConfirmReturned
                }).ToList()
            };

            return Ok(response);
        }
    }
}
