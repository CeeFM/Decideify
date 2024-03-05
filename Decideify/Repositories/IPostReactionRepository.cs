using Decideify.Models;

namespace Decideify.Repositories
{
    public interface IPostReactionRepository
    {
        void Add(PostReaction postreaction);
        void Delete(int reactionId);
        List<PostReaction> GetAll();
        List<PostReaction> GetByPostId(int postId);
    }
}