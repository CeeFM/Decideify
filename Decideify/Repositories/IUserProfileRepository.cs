using Decideify.Models;

namespace Decideify.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetById (int id);
        UserProfile GetByEmail (string email);
    }
}