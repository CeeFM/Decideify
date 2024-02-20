namespace Decideify.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        public int SubscribeUserProfileId { get; set; }
        public int ProviderUserProfileId { get; set; }
    }
}
