using Decideify.Models;
using Decideify.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Decideify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepository.GetAll());
        }

        // GET api/<SuggestionController>/5
        [HttpGet("{postId}")]
        public IActionResult Get(int postId)
        {
            return Ok(_commentRepository.GetByPostId(postId));
        }

        // POST api/<SuggestionController>
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            _commentRepository.Add(comment);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.Edit(comment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }
    }
}
