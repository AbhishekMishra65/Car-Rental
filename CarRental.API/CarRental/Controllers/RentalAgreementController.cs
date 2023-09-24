using Azure.Core;
using CarRental.Models.Domain;
using CarRental.Models.DTO;
using CarRental.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CarRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalAgreementController : ControllerBase
    { 
        private readonly IRentalAgreementRepository rentalAgreementRepository;
        private readonly ICarRepository carRepository;
        private readonly ITokenRepository tokenRepository;


        public RentalAgreementController(IRentalAgreementRepository rentalAgreementRepository,ICarRepository carRepository,ITokenRepository tokenRepository)
        {
            this.rentalAgreementRepository = rentalAgreementRepository;
            this.carRepository = carRepository;
            this.tokenRepository = tokenRepository;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateRentalAgreement([FromBody] RentalAgreementRequestDto request)
        {
            var exisitingUser = await tokenRepository.GetUserByEmailAsync(request.Email);

            var car = await carRepository.GetCarByIdAsync(request.CarVehicleId);

            var TotalPrice = RentPrice(request.FromDate, request.ToDate, car.PricePerHour);

            //convert Dto to Domain model
            var rentalAgreement = new RentalAgreement
            {
                UserId = exisitingUser.UserId,
                CarVehicleId = request.CarVehicleId,
                FromDate = request.FromDate,
                ToDate = request.ToDate,
                TotalPrice = TotalPrice,
                returnRequested = false,
                adminConfirmReturned = false
            };

            rentalAgreement = await rentalAgreementRepository.CreateRentalAgreementAsync(rentalAgreement);

            //Convert Domain model back to Dto
            var response = new RentalAgreementDto
            {
                AgreementId = rentalAgreement.AgreementId,
                CarVehicleId = rentalAgreement.CarVehicleId,
                UserId  = rentalAgreement.UserId,
                FromDate = rentalAgreement.FromDate,
                ToDate = rentalAgreement.ToDate,
                returnRequested = rentalAgreement.returnRequested,
                adminConfirmReturned = rentalAgreement.adminConfirmReturned,
                TotalPrice = rentalAgreement.TotalPrice
            };

            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("AllAgreement")]
        public async Task<IActionResult> GetAllAgreements()
        {
            var agreements = await rentalAgreementRepository.GetAllRentalAgreementAsync();

            return Ok(agreements);
        }

        [Authorize]
        [HttpGet]
        [Route("User/{userId:int}")]
        public async Task<IActionResult> GetUserAgreements([FromRoute] string userId)
        {

            //var exisitingUser = await tokenRepository.GetUserByEmailAsync(email.ToString());

            var agreements = await rentalAgreementRepository.GetUserAgreementsAsync(int.Parse(userId));

            // Convert Dto into Domain model
            var response = new List<RentalAgreementResponseDto>();

            foreach(var agreement in agreements)
            {
                response.Add(new RentalAgreementResponseDto
                {
                    AgreementId = agreement.AgreementId,
                    CarVehicleId = agreement.CarVehicleId,
                    UserId = agreement.UserId,
                    TotalPrice = agreement.TotalPrice,
                    FromDate = agreement.FromDate,
                    ToDate = agreement.ToDate,
                    returnRequested = agreement.returnRequested,
                    adminConfirmReturned = agreement.adminConfirmReturned
                });
            }

            return Ok(response);
        }

        [HttpPost]
        [Route("RentPrice")]
        public async Task<IActionResult> CalculateRentPrice(CalculateRentPriceDto request)
        {

            var TotalPrice = RentPrice(request.FromDate,request.ToDate, request.PricePerHour);

            return Ok(TotalPrice); 
        }

        private double RentPrice(DateTime FromDate,DateTime ToDate, double PricePerHour)
        {
            TimeSpan ts = ToDate - FromDate; // calculating total hours between two date or time
            double TotalPrice = ts.TotalHours * PricePerHour;
            return TotalPrice;
        }

        [Authorize]
        [HttpPut]
        [Route("{AgreementId:Guid}")]
        public async Task<IActionResult> EditReturnRequest([FromRoute] Guid AgreementId, RentalAgreementDto existingAgreement)
        {

            // convert Dto to domain model
            var agreement = new RentalAgreement
            {
                AgreementId = existingAgreement.AgreementId,
                CarVehicleId = existingAgreement.CarVehicleId,
                FromDate = existingAgreement.FromDate,
                ToDate = existingAgreement.ToDate,
                TotalPrice = existingAgreement.TotalPrice,
                UserId = existingAgreement.UserId,
                returnRequested = true,
                adminConfirmReturned = existingAgreement.adminConfirmReturned
            };

            var updatedAgreement = await rentalAgreementRepository.UpdateAgreementAsync(agreement);

            if(updatedAgreement == null)
            {
                return NotFound();
            }

            var response = new RentalAgreementDto
            {
                AgreementId = updatedAgreement.AgreementId,
                CarVehicleId = updatedAgreement.CarVehicleId,
                FromDate = updatedAgreement.FromDate,
                ToDate = updatedAgreement.ToDate,
                TotalPrice = updatedAgreement.TotalPrice,
                UserId = updatedAgreement.UserId,
                returnRequested = updatedAgreement.returnRequested,
                adminConfirmReturned = updatedAgreement.adminConfirmReturned 
            };

            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("AdminAcceptReturn/{AgreementId:Guid}")]
        public async Task<IActionResult> AdminEditAcceptReturn([FromRoute] Guid AgreementId, RentalAgreementDto existingAgreement)
        { 
            // fetch pricePerHour of a car with its VechileId
            var car = await carRepository.GetCarByIdAsync(existingAgreement.CarVehicleId);


            // convert Dto to domain model
            var agreement = new RentalAgreement
            {
                AgreementId = existingAgreement.AgreementId,
                CarVehicleId = existingAgreement.CarVehicleId,
                FromDate = existingAgreement.FromDate,
                ToDate = DateTime.Now,
                TotalPrice = RentPrice(existingAgreement.FromDate, DateTime.Now, car.PricePerHour),
                UserId = existingAgreement.UserId,
                returnRequested = existingAgreement.returnRequested,
                adminConfirmReturned = true
            };

            var updatedAgreement = await rentalAgreementRepository.UpdateAgreementAsync(agreement);

            if (updatedAgreement == null)
            {
                return NotFound();
            }

            var response = new RentalAgreementDto
            {
                AgreementId = updatedAgreement.AgreementId,
                CarVehicleId = updatedAgreement.CarVehicleId,
                FromDate = updatedAgreement.FromDate,
                ToDate = updatedAgreement.ToDate,
                TotalPrice = updatedAgreement.TotalPrice,
                UserId = updatedAgreement.UserId,
                returnRequested = updatedAgreement.returnRequested,
                adminConfirmReturned = updatedAgreement.adminConfirmReturned
            };

            return Ok(response);
        }
    }
}
