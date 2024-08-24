using Authentication.Domain.DTO;

namespace Authentication.Service.Interface
{
    public interface ILoginService
    {
        TokenDTO ValidateCredentials(UsersDTO user);

        TokenDTO ValidateCredentials(TokenDTO token);

        bool RevokeToken(string userName);
    }
}
