using Decideify.Models;

namespace Decideify.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        Category GetById(int id);
        List<Category> GetByType(string contentType);
    }
}