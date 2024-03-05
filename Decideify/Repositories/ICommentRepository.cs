using Decideify.Models;

namespace Decideify.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void Delete(int commentId);
        void Edit(Comment comment);
        List<Comment> GetAll();
        List<Comment> GetByPostId(int postId);
    }
}