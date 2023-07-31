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
        public double AverageRating { get; set; }
        public int TotalRatings { get; set; }
        
        public ICollection<JobJobSeeker> JobJobSeekers { get; set; } = new List<JobJobSeeker>();
        
    }
}