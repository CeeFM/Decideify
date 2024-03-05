using Decideify.Models;

namespace Decideify.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int postId);
        void Edit(Post post);
        List<Post> GetByUserId(int id);
        List<Post> GetAll();
    }
}