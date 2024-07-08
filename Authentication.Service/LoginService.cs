using Authentication.Domain.Configurations;
using Authentication.Domain.DTO;
using Authentication.Persistence.Interface;
using Authentication.Persistence.Repository;
using Authentication.Service.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Authentication.Service
{
    public class LoginService : ILoginService
    {
        private const string DATE_FORMAT = "yyyy:MM:dd:HH:mm:ss";
        private TokenConfiguration _configurtion;
        private IUsersRepository _usersRepository;
        private readonly ITokenService _tokenService;

        public LoginService(TokenConfiguration configurtion, IUsersRepository userRepository, ITokenService tokenService)
        {
            _configurtion = configurtion;
            _usersRepository = userRepository;
            _tokenService = tokenService;
        }

        public TokenDTO ValidateCredentials(UsersDTO userCredentials)
        {
            //Validar o usuario credenciais no banco
            var user = _usersRepository.ValidateCredentials(userCredentials);
            if (user == null) return null;

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
            };

            //Criando o AccessToken e o RefreshToken
            var accessToken = _tokenService.GenerateAccessToken(claims); //Token para autenticar 
            var refreshToken = _tokenService.GenerateRefreshToken(); //Usar caso o accessToken estiver expirado


            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(_configurtion.DaysToExpiry);

            DateTime createDate = DateTime.Now; //Data de criação do Token
            DateTime expirationDate = createDate.AddMinutes(_configurtion.Minutes);

            //Vamos persistir isso na base.
            _usersRepository.RefreshUserInfo(user);

            return new TokenDTO(
                true,
                createDate.ToString(DATE_FORMAT),
                expirationDate.ToString(DATE_FORMAT),
                accessToken,
                refreshToken
                );
        }


        public bool RevokeToken(string userName)
        {
            return _usersRepository.RevokeToken(userName);
        }


        public TokenDTO ValidateCredentials(TokenDTO token)
        {
            var accessToken = token.AccessToken;  //Token para autenticar 
            var refreshToken = token.RefreshToken; //Usar caso o accessToken estiver expirado

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);

            //Recuperando o Usuario
            var username = principal.Identity.Name;
            var user = _usersRepository.ValidateCredentials(username);
            if (user == null ||
                user.RefreshToken != refreshToken ||
                user.RefreshTokenExpiryTime <= DateTime.Now)
                return null;


            accessToken = _tokenService.GenerateAccessToken(principal.Claims);
            refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            //Vamos persistir isso na base.
            _usersRepository.RefreshUserInfo(user);

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(_configurtion.DaysToExpiry);

            DateTime createDate = DateTime.Now; //Data de criação do Token
            DateTime expirationDate = createDate.AddMinutes(_configurtion.Minutes);


            return new TokenDTO(
                true,
                createDate.ToString(DATE_FORMAT),
                expirationDate.ToString(DATE_FORMAT),
                accessToken,
                refreshToken
                );
        }
    }
}
