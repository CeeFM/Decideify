using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Decideify.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ContentType { get; set; }
        public int ExternalId { get; set; }
        public int ResultsCount { get; set; }
    }
}
