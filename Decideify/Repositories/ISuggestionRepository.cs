using Decideify.Models;

namespace Decideify.Repositories
{
    public interface ISuggestionRepository
    {
        void Add(Suggestion suggestion);
        List<Suggestion> GetByUserId(int id);
    }
}