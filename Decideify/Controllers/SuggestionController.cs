using Decideify.Repositories;
using Decideify.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Decideify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestionController : ControllerBase
    {

        private readonly ISuggestionRepository _suggestionRepository;
        public SuggestionController(ISuggestionRepository suggestionRepository)
        {
            _suggestionRepository = suggestionRepository;
        }
        // GET: api/<SuggestionController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<SuggestionController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_suggestionRepository.GetByUserId(id));
        }

        // POST api/<SuggestionController>
        [HttpPost]
        public IActionResult Post(Suggestion suggestion)
        {
            _suggestionRepository.Add(suggestion);
             return NoContent();
        }

        //// PUT api/<SuggestionController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<SuggestionController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
