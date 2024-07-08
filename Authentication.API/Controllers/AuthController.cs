using Authentication.Domain.DTO;
using Authentication.Domain.Model;
using Authentication.Persistence.Interface;
using Authentication.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Authentication.API.Controllers
{

    //[Route("api/[controller]/v{version:apiVersion}")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUsersRepository _usersRepository;
        private readonly ILoginService _loginService;

        public AuthController(IUsersRepository usersRepository, ILoginService loginService)
        {
            _usersRepository = usersRepository;
            _loginService = loginService;
        }

        [HttpPost]
        [Route("signin")]
        public IActionResult Signin([FromBody] UsersDTO user)
        {
            if (user == null) return BadRequest("Ivalid client request");
            var token = _loginService.ValidateCredentials(user);
            if (token == null) return Unauthorized();
            return Ok(token);
        }

        [HttpPost]
        [Route("refresh")]
        public IActionResult Refresh([FromBody] TokenDTO tokenVo)
        {
            if (tokenVo == null) return BadRequest("Ivalid client request");
            var token = _loginService.ValidateCredentials(tokenVo);
            if (token == null) return BadRequest("Ivalid client request");
            return Ok(token);
        }

        [HttpPost]
        [Route("signup")]
        public IActionResult Signup([FromBody] Users newUser)
        {
            if (newUser == null) return BadRequest("Invalid client request");
            var user = _usersRepository.CreateUser(newUser);
            if (user == null) return BadRequest("User already exists");
            return Ok(user);
        }

        //[HttpGet]
        //[Route("revoke")] //User revoke no LogOff
        //[Authorize("Bearer")] //Adicionando regra para que obriga autenticação
        //public IActionResult Revoke() // Não precisa passar parametro porque ja temos o Bearer
        //{
        //    var username = User.Identity.Name;
        //    var result = _loginService.RevokeToken(username);

        //    if (!result) return BadRequest("Ivalid client request");
        //    return Ok("Logoff realizado com sucesso. Faça login novamente para gerar token.");
        //}
    }
}
