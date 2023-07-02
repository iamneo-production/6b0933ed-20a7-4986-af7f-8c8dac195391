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
using Microsoft.EntityFrameworkCore;


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
        try{
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
            return Ok(appliedJobs);
        }
        }
        catch (Exception){
            return BadRequest(new { Msg = "Error Occured" });
        }
    }
    [HttpGet]
    [Route("getJobs")]
    public IActionResult GetJobs(){
        try{
        List<Job> jobs = _context.Jobs.ToList();
                if (!jobs.Any())
                {
                    return Conflict(new { Msg = "No Job Found" }); 
                }
                return Ok(jobs);
        }
        catch (Exception){
            return BadRequest(new { Msg = "Error Occured" });
        }
    }
        [HttpPost]
        [Route("applyJob{id}")]
        public async Task<IActionResult> ApplyJob(int id,[FromBody] JobSeeker seeker,[FromQuery] UserRequestModel requestModel ){
            try{
                var existJobJob=await _context.JobJobSeekers.FirstOrDefaultAsync(jjs=> jjs.JobSeekerId==requestModel.UserId && jjs.JobId==id);
                if (existJobJob==null){
                    var JobJob =new  JobJobSeeker{
                        JobId=id,
                        JobSeekerId=requestModel.UserId,
                    };
                    await _context.JobJobSeekers.AddAsync(JobJob);
                    var existjobseeker=await _context.JobSeekers.FirstOrDefaultAsync(js=>js.JobSeekerId==requestModel.UserId);
                    if (existjobseeker!=null){
                        existjobseeker.JobSeekerName=seeker.JobSeekerName;
                        existjobseeker.MobileNumber=seeker.MobileNumber;
                        existjobseeker.Address=seeker.Address;
                        existjobseeker.Experience=seeker.Experience;
                        _context.JobSeekers.Update(existjobseeker);
                    }
                    else{
                       return BadRequest(new { Msg = "Error Occured" });
                    } 
                }
                else{
                    return BadRequest(new { Msg = "Error Occured" });
                }
                await _context.SaveChangesAsync();
                return Ok(new{Msg="Applied Successfully"});
            }
            catch (Exception){
               return BadRequest(new { Msg = "Error Occured" });
            }
        }
    [HttpGet]
    [Route("getProfile")]
    public async Task<IActionResult> GetProfile([FromQuery] UserRequestModel requestModel){
       try{
            var profile=await _context.JobSeekers.FirstOrDefaultAsync(js=>js.JobSeekerId==requestModel.UserId);
            if (profile!=null){
                return Ok(profile);
            }
            else{
                return NotFound(new {msg="Not Found"});
            }
        }
        catch(Exception){
            return BadRequest(new { Msg = "Error Occured" });
        }
    }
     [HttpGet]
    [Route("checkAlreadyApplied{id}")]
    public IActionResult CheckAlreadyApplied(int id,[FromQuery] UserRequestModel requestModel){
      try{
            var JobJob=_context.JobJobSeekers.FirstOrDefault(jjs=>jjs.JobId==id && jjs.JobSeekerId==requestModel.UserId);
            if (JobJob!=null){
                return Ok("true");
            }
            else{
                return Ok("false");
            }
        }
        catch(Exception){
            return BadRequest(new { Msg = "Error Occured" });
        }
    }
    }
        
}
