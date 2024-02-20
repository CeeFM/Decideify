using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Decideify.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageLocation { get; set; }
        public DateTime CreateDateTime { get; set; }
        public bool IsApproved { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
