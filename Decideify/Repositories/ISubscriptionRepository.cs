using Decideify.Models;

namespace Decideify.Repositories
{
    public interface ISubscriptionRepository
    {
        void Add(Subscription subscription);
        void Delete(int subscribeUserProfileId, int providerUserProfileId);
        List<Subscription> GetAll();
        List<Subscription> GetSubscriptionsByUserId(int id);
    }
}