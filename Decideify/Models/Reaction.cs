using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Decideify.Models
{
    public class Reaction
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageLocation { get; set; }

    }
}
