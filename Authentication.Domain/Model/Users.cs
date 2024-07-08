using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Authentication.Domain.Model
{
    [Table("Users")]
    public class Users
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }

        [Column("Username")]
        public string UserName { get; set; }

        [Column("FullName")]
        public string FullName { get; set; }

        [Column("Password")]
        public string Password { get; set; }

        [Column("RefreshToken")]
        public string RefreshToken { get; set; }

        [Column("RefreshTokenExpiryTime")]
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
