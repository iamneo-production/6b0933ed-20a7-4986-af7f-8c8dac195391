using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class JobJobSeeker
    {
        public int JobId { get; set; }
        public Job Job { get; set; }
<<<<<<< HEAD

        public int JobSeekerId { get; set; }
        public JobSeeker JobSeeker { get; set; }
=======
        public int JobSeekerId { get; set; }
        public JobSeeker JobSeeker { get; set; }
        public string Status {get;set;}
>>>>>>> f176ac5fdad4dfb41d8b6e31f46660dac3968e1a
    }
}