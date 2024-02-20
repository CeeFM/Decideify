using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Decideify.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FirstName {  get; set; }
        public string LastName { get; set; }
        public DateTime CreateDateTime { get; set; }
        public string ImageLocation { get; set; }
        public bool IsPublic { get; set; }
        public string Bio {  get; set; }
    }
}
