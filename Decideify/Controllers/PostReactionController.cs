using Decideify.Models;
using Decideify.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Decideify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostReactionController : ControllerBase
    {
        private readonly IPostReactionRepository _postReactionRepository;
        public PostReactionController(IPostReactionRepository postReactionRepository)
        {
            _postReactionRepository = postReactionRepository;
        }
        // GET: api/<ReactionController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postReactionRepository.GetAll());
        }

        // GET api/<ReactionController>/5
        [HttpGet("{PostId}")]
        public IActionResult GetByPostId(int PostId)
        {
            return Ok(_postReactionRepository.GetByPostId(PostId));
        }

        [HttpPost]
        public IActionResult Post(PostReaction postReaction)
        {
            _postReactionRepository.Add(postReaction);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postReactionRepository.Delete(id);
            return NoContent();
        }
    }
}
