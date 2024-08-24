using Authentication.Domain.DTO;
using Authentication.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Authentication.Persistence.Interface
{
    public interface IUsersRepository
    {
        Users RefreshUserInfo(Users user);
        Users ValidateCredentials(UsersDTO user);

        //Validação para receber apenas o username
        Users ValidateCredentials(string username);

        bool RevokeToken(string userName);

        //GTP
        Users CreateUser(Users newUser);
    }
}
