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
using Microsoft.EntityFrameworkCore;


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
    try
    {
        List<JobSeeker> jobseekers = null;
            jobseekers = await _context.JobSeekers
                .Join(_context.JobJobSeekers,
                    js => js.JobSeekerId,
                    jj => jj.JobSeekerId,
                    (js, jj) => new { Jobseeker = js, JobJobSeeker = jj })
                .Join(_context.Jobs,
                    jj => jj.JobJobSeeker.JobId,
                    j => j.JobId,
                    (jj, j) => jj.Jobseeker) 
                .ToListAsync();
                
            if (!jobseekers.Any())
            {
                
                return NotFound(new { msg = "No one Applied for your Jobs" });
            }

        return Ok(jobseekers);
    }
    catch (Exception)
    {
          return BadRequest(new { Msg = "Error Occured" });
    }
}

    [HttpGet("getAlljobs")]
    public IActionResult GetAllJobs([FromQuery] UserRequestModel requestModel)
    {
        try{
            if (requestModel.userRole=="User"){
                List<Job> jobs = _context.Jobs.Where(j => j.UserId ==requestModel.UserId).ToList();
                if (!jobs.Any())
                {
                    return NotFound(new { Msg = "No Job Found" });
                }
                else{
                return Ok(jobs);}
        }

        else{
            List<Job> jobs = _context.Jobs.ToList();
            if (!jobs.Any())
            {
                return NotFound(new { Msg = "No Job Found" });
            }
            else
            {return Ok(jobs);}
        }
        
        }
        catch(Exception ){
            return BadRequest(new { Msg = "Error Occured" });
        }     
    }
        [HttpPost]
        [Route("addJob")]
        public async Task<IActionResult> AddJob([FromBody] Job data,[FromQuery] UserRequestModel requestModel)
        {
            try{
                
                var job = new Job
                {
                    JobDescription = data.JobDescription,
                    UserId =requestModel.UserId,
                    JobLocation = data.JobLocation,
                    FromDate = data.FromDate,
                    ToDate = data.ToDate,
                    WagePerDay = data.WagePerDay,
                    MobileNumber = data.MobileNumber
                };
                _context.Jobs.Add(job);
                await _context.SaveChangesAsync();
                return Ok(new { Msg = "JobAdded Successfull" });
            }
            catch(Exception)
            {
                return Conflict(new { msg = "Unable to add Job" });
            }
        }
         [HttpPut]
        [Route("editJob{id}")]
        public async Task<IActionResult> EditJob(int id, [FromBody] Job data,[FromQuery] UserRequestModel requestModel)
        {
            try{
            if (requestModel.userRole.Equals("Admin"))
            {
                Job existingJob = _context.Jobs.FirstOrDefault(j => j.JobId == id);
                if (existingJob != null)
                {
                    existingJob.JobDescription = data.JobDescription;
                    existingJob.JobLocation = data.JobLocation;
                    existingJob.ToDate = data.ToDate;
                    existingJob.FromDate = data.FromDate;
                    existingJob.WagePerDay = data.WagePerDay;
                    existingJob.MobileNumber = data.MobileNumber;
                    await _context.SaveChangesAsync();
                    return Ok(new { msg = "Successfully Updated" });
                }
                return NotFound(new { msg = "Job Not Found" });
            }
            else
            {
                Job existingJob = _context.Jobs.FirstOrDefault(j => j.JobId == id && j.UserId == requestModel.UserId);
                if (existingJob != null)
                {
                    existingJob.JobDescription = data.JobDescription;
                    existingJob.JobLocation = data.JobLocation;
                    existingJob.ToDate = data.ToDate;
                    existingJob.FromDate = data.FromDate;
                    existingJob.WagePerDay = data.WagePerDay;
                    existingJob.MobileNumber = data.MobileNumber;
                    await _context.SaveChangesAsync();
                    return Ok(new { msg = "Successfully Updated" });
                }
                return NotFound(new { msg = "Job Not Found" });
            }
            }
            catch(Exception){
                return BadRequest(new { Msg = "Error Occured" });
            }

        }
        [HttpDelete]
        [Route("deleteJob{id}")]
        public async Task<IActionResult> DeleteJob(int id,[FromQuery] UserRequestModel requestModel)
        {
            try{
            if (requestModel.userRole.Equals("Admin"))
            {
                var existingJob = _context.Jobs.FirstOrDefault(j => j.JobId == id);
                if (existingJob != null)
                {
                    _context.Jobs.Remove(existingJob);
                    await _context.SaveChangesAsync();
                    return Ok(new { msg = "Deleted Sucessfully" });
                }
                return Conflict(new { msg = "Job Not Found" });
            }
            else
            {
                var existingJob = _context.Jobs.FirstOrDefault(j => j.JobId == id && j.UserId == requestModel.UserId);
                if (existingJob != null)
                {
                    _context.Jobs.Remove(existingJob);
                    await _context.SaveChangesAsync();
                    return Ok(new { msg = "Deleted Sucessfully" });
                }
                return Conflict(new { msg = "Job Not Found" });
            }
        }
        catch(Exception){
            return BadRequest(new { Msg = "Error Occured" });
        }
        }
        [HttpGet]
        [Route("Appliedprofiles")]
        public IActionResult AppliedGetProfile([FromQuery] UserRequestModel requestModel)
        {
            try{
            List<JobSeeker> jobseekers = _context.JobSeekers
            .Join(_context.JobJobSeekers,
            js => js.JobSeekerId,
            jj => jj.JobSeekerId,
            (js, jj) => new { Jobseeker = js, JobJobseeker = jj })
            .Join(_context.Jobs,
            jj => jj.JobJobseeker.JobId,
            j => j.JobId,
            (jj, j) => new { jj.Jobseeker, Job = j })
            .Where(j => j.Job.UserId == requestModel.UserId)
            .Select(j => j.Jobseeker)
            .ToList();
            if (!jobseekers.Any()){
            
            return NotFound(new {msg="No one Applied for your Jobs"});
            }
            else{
                return (Ok(jobseekers));
            }
            }
            catch (Exception){
                return BadRequest(new { Msg = "Error Occured" });
        }     
   }
}
}
