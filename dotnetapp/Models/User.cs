using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace dotnetapp.Models
{
    public class User
    {
        public int  UserId { get; set; }
        public string UserRole { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string MobileNumber { get; set; }

        //Navigation Property: JObs Posted by the User
        public ICollection<Job> Jobs{ get; set; }
    }
}