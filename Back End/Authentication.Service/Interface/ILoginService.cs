using Authentication.Domain.DTO;
using Authentication.Domain.Model;

namespace Authentication.Service.Interface
{
    public interface ILoginService
    {
        TokenDTO ValidateCredentials(UsersDTO user);

        TokenDTO ValidateCredentials(TokenDTO token);

        bool RevokeToken(string userName);

        List<Users> GetUsers();
    }
}
