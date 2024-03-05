using Decideify.Models;
using Decideify.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Decideify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        public SubscriptionController(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_subscriptionRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Subscription? subscription)
        {
            _subscriptionRepository.Add(subscription);
            return NoContent();
        }


        [HttpGet("{userId}")]
        public IActionResult GetSubscriptionsByUserId(int userId)
        {

            return Ok(_subscriptionRepository.GetSubscriptionsByUserId(userId));
        }


        [HttpDelete("{subscriberUserProfileId}/{providerUserProfileId}")]
        public IActionResult Delete(int subscriberUserProfileId, int providerUserProfileId)
        {
            _subscriptionRepository.Delete(subscriberUserProfileId, providerUserProfileId);
            return NoContent();
        }
    }
}
