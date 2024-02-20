using Decideify.Models;

namespace Decideify.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
    }
}