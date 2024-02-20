using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Decideify.Models
{
    public class PostTag
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int SuggestionId { get; set; }
        public Suggestion Suggestion { get; set;}
        public UserProfile UserProfile { get; set; }
    }
}
