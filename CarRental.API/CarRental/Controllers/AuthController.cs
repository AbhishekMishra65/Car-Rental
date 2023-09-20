using CarRental.DataContext;
using CarRental.Models.Domain;
using CarRental.Models.DTO;
using CarRental.Repositories.Implementation;
using CarRental.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CarRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly CarRentalDbContext dbContext;
        private readonly ITokenRepository tokenRepository;

        public AuthController(CarRentalDbContext dbContext, ITokenRepository tokenRepository)
        {
            this.dbContext = dbContext;
            this.tokenRepository = tokenRepository;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRequestDto request)
        {
            var exisitingUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == request.Email);
            if (exisitingUser != null)
            {
                return Ok();

            }
            else
            {
                var user = new User
                {
                    Name = request.Name.Trim(),
                    Email = request.Email.Trim(),
                    Password = request.Password,
                    Address = request.Address,
                    Role = "normaluser",
                };

                await dbContext.Users.AddAsync(user);
                await dbContext.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            var exisitingUser = await tokenRepository.GetUserByEmailAsync(request.Email);

            if (exisitingUser != null)
            {
                if (request.Password == exisitingUser.Password)
                {
                    //var roles = exisitingUser.Role;

                    // Create a Token and Response
                    var jwtToken = tokenRepository.CreateJwtToken(exisitingUser, exisitingUser.Role);

                    var response = new LoginResponseDto()
                    {
                        Token = jwtToken,
                        Email = request.Email,
                        Role = exisitingUser.Role,
                        UserId = exisitingUser.UserId.ToString(),
                        Name= exisitingUser.Name
                    };
                    return Ok(response);
                }
                else
                {
                    return Ok("Wrong Password");
                }
            }
            else
            {
                return Ok("User not found");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var users = await tokenRepository.GetAllUserAsync();

            var response = new List<UserResponseDto>();

            foreach (var user in users)
            {
                response.Add(new UserResponseDto
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    Role = user.Role,
                    Address = user.Address,
                    Name = user.Name,
                    Agreements = user.Agreements.Select(x => new RentalAgreementDto
                    {
                        AgreementId = x.AgreementId,
                        UserId = x.UserId,
                        CarVehicleId = x.CarVehicleId,
                        FromDate = x.FromDate,
                        ToDate = x.ToDate,
                        TotalPrice = x.TotalPrice,
                        returnRequested = x.returnRequested,
                    }).ToList(),
                });
            }

            return Ok(response);
        }
    }
}
