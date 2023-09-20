using CarRental.DataContext;
using CarRental.Models.Domain;
using CarRental.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CarRental.Repositories.Implementation
{
    public class TokenRepository : ITokenRepository
    {
        private readonly IConfiguration configuration;
        private readonly CarRentalDbContext dbContext;

        public TokenRepository(IConfiguration configuration, CarRentalDbContext dbContext)
        {
            this.configuration = configuration;
            this.dbContext = dbContext;
        }

        public string CreateJwtToken(User user, string role)
        {
            // Create Claims
            var claims = new[]
{
                new Claim(ClaimTypes.NameIdentifier, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            // JWT Security Token Parameters 
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            // Return Token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<IEnumerable<User>> GetAllUserAsync()
        {
            return await dbContext.Users.Include(x=>x.Agreements).ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int UserId)
        {
            return await dbContext.Users.Include(x => x.Agreements).FirstOrDefaultAsync(x=>x.UserId == UserId);
        }
        public async Task<User> GetUserByEmailAsync(string Email)
        {
            return await dbContext.Users.Include(x => x.Agreements).FirstOrDefaultAsync(x=>x.Email == Email);
        }

    }
}
