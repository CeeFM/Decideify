using Decideify.Models;

namespace Decideify.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetById (int id);
        UserProfile GetByEmail (string email);
        void Add (UserProfile profile);
        void Edit (UserProfile profile);
    }
}