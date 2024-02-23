using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Decideify.Models
{
    public class Suggestion
    {
        public int Id { get; set; }
        public string ContentType { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public string Creator { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public string? ImageLocation { get; set; }
        public int? CategoryId { get; set; }
        public int UserProfileId { get; set; }
        public bool? IsRecommended { get; set; }
        public string? ExternalLink { get; set; }
        public string? ExternalId { get; set; }
    }
}
