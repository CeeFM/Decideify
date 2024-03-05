using Decideify.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Decideify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly IReactionRepository _reactionRepository;
        public ReactionController(IReactionRepository reactionRepository)
        {
            _reactionRepository = reactionRepository;
        }
        // GET: api/<ReactionController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reactionRepository.GetAll());
        }

        // GET api/<ReactionController>/5
        [HttpGet("{reactionId}")]
        public IActionResult GetReactionById(int reactionId)
        {
            return Ok(_reactionRepository.GetById(reactionId));
        }
    }
}
