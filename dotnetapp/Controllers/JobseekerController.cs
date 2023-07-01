using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Data;
using System.Net;
using dotnetapp.Models;
using System.Net.Http;
using dotnetapp.Service;


namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("jobseeker")]
    public class JobseekerController:ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly HttpClient _httpClient;

    public JobseekerController(MyDbContext context ){
        _context=context;
        _httpClient = new HttpClient();
        
    }
    [HttpGet]
    [Route("getAppliedJobs")]
    public IActionResult GetAppliedJobs([FromQuery] UserRequestModel requestModel){
        int UserId = requestModel.UserId;
        List<Job> appliedJobs =  _context.Jobs
                    .Join(_context.JobJobSeekers,
                        job => job.JobId,
                        appliedJob => appliedJob.JobId,
                        (job, appliedJob) => new { Job = job, AppliedJob = appliedJob })
                    .Where(ja => ja.AppliedJob.JobSeekerId == 1)
                    .Select(ja => ja.Job)
                    .ToList();
        if (!appliedJobs.Any()){
            return Ok(UserId);
            // return NotFound(jobSeekerId);

        }
        else
        {
                return Ok("uSER");
        }
        }
    [HttpGet]
    [Route("getJobs")]
    public IActionResult GetJobs(){
        List<Job> jobs = _context.Jobs.ToList();
                if (!jobs.Any())
                {
                return Ok(jobs);

                    // return Conflict(new { Msg = "No Job Found" }); // Return HTTP 204 No Content if no jobs are found
                }
                return Ok(jobs);

        }
    }
        
}
