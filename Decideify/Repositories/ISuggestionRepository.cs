using Decideify.Models;

namespace Decideify.Repositories
{
    public interface ISuggestionRepository
    {
        void Add(Suggestion suggestion);
        void Delete(int suggestionId);
        void Edit(Suggestion suggestion);
        List<Suggestion> GetByUserId(int id);
    }
}