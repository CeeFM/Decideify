namespace Decideify.Models
{
    public class PostReaction
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int ReactionId { get; set; }
        public int UserProfileId { get; set; }


    }
}
