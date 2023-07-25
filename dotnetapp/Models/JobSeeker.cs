using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class JobSeeker
    {
        public int JobSeekerId { get; set; }
        public string UserRole { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string JobSeekerName { get; set; }
        public string Address { get; set; }
        public string Experience { get; set; }
        public string MobileNumber { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD

        //Navigation Property: Job Applied by the Job Seeker
        public ICollection<JobJobSeeker> JobJobSeekers { get; set; }
=======
=======
        public double AverageRating { get; set; }
        public int TotalRatings { get; set; }
>>>>>>> 919c5631c3b80e9840ba89bb9d0c40b04ba4cebc
        
        public ICollection<JobJobSeeker> JobJobSeekers { get; set; } = new List<JobJobSeeker>();
>>>>>>> f176ac5fdad4dfb41d8b6e31f46660dac3968e1a
        
    }
}