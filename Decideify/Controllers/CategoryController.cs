using Decideify.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Decideify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // GET: api/<UserProfileController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

        //// GET api/<UserProfileController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_categoryRepository.GetById(id));
        }

        [HttpGet("GetByType")]
        public IActionResult GetByType(string contentType)
        {
            var category = _categoryRepository.GetByType(contentType);

            if (contentType == null || category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }
    }
}
