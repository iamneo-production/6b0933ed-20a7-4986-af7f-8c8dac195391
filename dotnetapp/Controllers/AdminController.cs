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
using dotnetapp.Controllers;


namespace dotnetapp.Controllers
{
    [Route("admin")]
    [ApiController]
     public class AdminController : ControllerBase
   {
    private readonly MyDbContext _context;

    public AdminController(MyDbContext context){
        _context=context;
       
    }
    [HttpGet("Profile")]
    public async Task<IActionResult> GetProfile()
    {
        try{
        List<JobSeeker> jobseekers =  _context.JobSeekers
            .Join(_context.JobJobSeekers,
            js => js.JobSeekerId,
            jj => jj.JobSeekerId,
            (js, jj) => new { Jobseeker = js, JobJobseeker = jj })
            .Join(_context.Jobs,
            jj => jj.JobJobseeker.JobId,
            j => j.JobId,
            (jj, j) => new { jj.Jobseeker, Job = j })
            .Select(j => j.Jobseeker)
            .ToList();
            if (!jobseekers.Any()){
                return (NotFound());
            }
            else{
                return (Ok(jobseekers));
            }
        }
        catch(Exception e){
            return BadRequest();
        }
           
    }

    [HttpGet("getAlljobs")]
    public IActionResult GetAllJobs()
    {
        try{
        List<Job> jobs = _context.Jobs.ToList();
            if (!jobs.Any())
            {
                return NotFound(new { Msg = "No Job Found" });
            }
            else
            {return Ok(jobs);}
        }
        catch(Exception e){
            return BadRequest();
        }
            
    }
    
}
}