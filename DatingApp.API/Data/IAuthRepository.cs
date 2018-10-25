using System.Threading.Tasks;

using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
         Task<UserModel> Register(UserModel user, string password);
         Task<UserModel> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}