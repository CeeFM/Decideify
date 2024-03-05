using Decideify.Models;

namespace Decideify.Repositories
{
    public interface IPostTagRepository
    {
        void Add(PostTag posttag);
        List<PostTag> GetAll();
        PostTag GetById(int id);
        PostTag GetByPostId(int postId);
    }
}