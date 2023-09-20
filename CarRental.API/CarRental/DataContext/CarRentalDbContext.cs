using CarRental.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Reflection.Emit;

namespace CarRental.DataContext
{
    public class CarRentalDbContext : DbContext
    {
        public CarRentalDbContext(DbContextOptions options) : base(options)
        {

        }


        public DbSet<Car> Cars { get; set; }
        public DbSet<RentalAgreement> Agreements { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasData(
             new User
             {
                 UserId = 1,
                 Name = "Abhishek Mishra",
                 Email = "abhishek@gmail.com",
                 Password = "abhishek",
                 Role = "Admin",
                 Address = "Kanpur"
             }
             );
        }
    }
}
