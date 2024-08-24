using Authentication.Domain.DTO;
using Authentication.Domain.Model;
using Authentication.Persistence.Context;
using Authentication.Persistence.Interface;
using System.Security.Cryptography;
using System.Text;

namespace Authentication.Persistence.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private readonly AuthenticationContext _context;

        public UsersRepository(AuthenticationContext context)
        {
            _context = context;
        }


        public Users CreateUser(Users newUser)
        {
            if (_context.Users.Any(u => u.UserName == newUser.UserName))
            {
                return null; // Usuário já existe
            }

            var user = new Users
            {
                UserName = newUser.UserName,
                Password = ComputeHash(newUser.Password),
                FullName = newUser.FullName,
                RefreshToken = string.Empty,
                RefreshTokenExpiryTime = DateTime.Now
            };

            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public Users RefreshUserInfo(Users user)
        {
            //Se a request não encontrar usuario nenhum, retorna null
            if (!_context.Users.Any(u => u.Id.Equals(user.Id))) return null;

            var result = _context.Users.SingleOrDefault(p => p.Id.Equals(user.Id));
            if (result != null) //Se o resultado for diferente de null, vamos atualizar as informaçoes do usuario.
            {
                try
                {
                    _context.Entry(result).CurrentValues.SetValues(user);
                    _context.SaveChanges();
                    return result;
                }
                catch (Exception)
                {
                    throw;
                }
            }
            return result;
        }

        public bool RevokeToken(string userName)
        {
            var user = _context.Users.SingleOrDefault(u => (u.UserName == userName));
            if (user is null) return false;

            user.RefreshToken = null;
            _context.SaveChanges();

            return true;
        }

        public Users ValidateCredentials(UsersDTO user)
        {
            var pass = ComputeHash(user.Password);
            return _context.Users.FirstOrDefault(u => (u.UserName == user.UserName) && (u.Password == pass));
        }

        public Users ValidateCredentials(string username)
        {
            return _context.Users.SingleOrDefault(u => (u.UserName == username));
        }

        private string ComputeHash(string input)
        {
            using (var algorithm = SHA256.Create())
            {
                Byte[] inputBytes = Encoding.UTF8.GetBytes(input);
                Byte[] hashedBytes = algorithm.ComputeHash(inputBytes);
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }
}
