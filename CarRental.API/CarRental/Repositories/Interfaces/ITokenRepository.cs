using CarRental.Models.Domain;

namespace CarRental.Repositories.Interfaces
{
    public interface ITokenRepository
    {
       string CreateJwtToken(User user, string role);
       Task<User> GetUserByIdAsync(int UserId);
        Task<IEnumerable<User>> GetAllUserAsync();
        Task<User> GetUserByEmailAsync(string Email);
    }
}
