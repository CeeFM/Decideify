using Decideify.Models;
using Decideify.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Decideify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostTagRepository _postTagRepository;
        public PostTagController(IPostTagRepository postTagRepository)
        {
            _postTagRepository = postTagRepository;
        }
        // GET: api/<ReactionController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postTagRepository.GetAll());
        }

        // GET api/<ReactionController>/5
        [HttpGet("{PostId}")]
        public IActionResult GetByPostId(int PostId)
        {
            return Ok(_postTagRepository.GetByPostId(PostId));
        }

        [HttpPost]
        public IActionResult Post(PostTag posttag)
        {
            _postTagRepository.Add(posttag);
            return NoContent();
        }
    }
}
