using Decideify.Models;

namespace Decideify.Repositories
{
    public interface IReactionRepository
    {
        List<Reaction> GetAll();
        Reaction GetById(int reactionId);
    }
}