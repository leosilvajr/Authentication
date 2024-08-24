using Authentication.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Authentication.Persistence.Context
{
    public class AuthenticationContext : DbContext
    {
        public AuthenticationContext(DbContextOptions<AuthenticationContext> options) : base(options)
        {
            
        }

        public DbSet<Users> Users { get; set; }
    }
}
