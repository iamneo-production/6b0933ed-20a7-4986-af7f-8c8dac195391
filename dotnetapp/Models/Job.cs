using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class Job
    {
        public int JobId { get; set; }
        public string JobDescription { get; set; }
        public string JobLocation { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string WagePerDay { get; set; }
        public string MobileNumber { get; set; }

        // Foreign Key: User who Posted Job
        public int UserId { get; set; }
        public User User { get; set; }

        //Navigation Property: JobSeeker who have applied for the job
        public ICollection<JobJobSeeker> JobJobSeekers { get; set; }
    }
}