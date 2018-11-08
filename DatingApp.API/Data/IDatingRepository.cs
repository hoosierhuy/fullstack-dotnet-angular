using DatingApp.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<UserModel>> GetUsers();
        Task<UserModel> GetUser(int id);
    }
}
