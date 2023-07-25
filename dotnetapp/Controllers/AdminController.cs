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
<<<<<<< HEAD

=======
>>>>>>> f176ac5fdad4dfb41d8b6e31f46660dac3968e1a
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
<<<<<<< HEAD
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
=======
        {    
        try
        {
        var appliedJobs = _context.JobJobSeekers
            .Where(jjs => jjs.Job.UserId == requestModel.UserId)
            .Select(jjs => new
            {
                jjs.JobId,
                Job = _context.Jobs.FirstOrDefault(j => j.JobId == jjs.JobId),
                JobSeeker = _context.JobSeekers.FirstOrDefault(js => js.JobSeekerId == jjs.JobSeekerId),
                jjs.Status
            })
            .ToList();

        return Ok(appliedJobs);
    }
    catch (Exception)
    {
        return BadRequest(new { Msg = "Error Occurred" });
    }
   }
        [HttpDelete]
        [Route("deleteProfile{id}")]
        public async Task<IActionResult> DeleteProfile(int id,[FromQuery] UserRequestModel requestModel)
        {
            try{
                var existJobJob=_context.JobJobSeekers.FirstOrDefault(jjs=>jjs.JobId==id && jjs.JobSeekerId==requestModel.UserId);
                if (existJobJob!=null){
                    _context.JobJobSeekers.Remove(existJobJob);
                    await _context.SaveChangesAsync();
                    return Ok(new { msg = "Deleted Sucessfully" });
                }
                return Conflict(new{msg="Profile Not Found"});
           
        }
        catch(Exception){
            return BadRequest(new { Msg = "Error Occured" });
        }
        }

        [HttpPut]
        [Route("editProfile{id}")]
          public async Task<IActionResult> editProfile(int id,[FromQuery] UserRequestModel requestModel,[FromBody] JobSeeker seeker)
        {
            try{
                var existjobjob=_context.JobJobSeekers.FirstOrDefault(jjs=>jjs.JobSeekerId==id);
                if (existjobjob!=null){
                   var existjobseeker=await _context.JobSeekers.FirstOrDefaultAsync(js=>js.JobSeekerId==id);
                    if (existjobseeker!=null){
                        existjobseeker.JobSeekerName=seeker.JobSeekerName;
                        existjobseeker.MobileNumber=seeker.MobileNumber;
                        existjobseeker.Address=seeker.Address;
                        existjobseeker.Experience=seeker.Experience;
                        _context.JobSeekers.Update(existjobseeker);
                        await _context.SaveChangesAsync();
                        return Ok(new {msg="Profile Updated Successfully"});
                    }
                    else{
                        return Conflict(new{msg="Profile Not Found"});
                    }
                }else{
                    return BadRequest(new{msg="Error Occured"});
                }

            }
            catch(Exception){
                return BadRequest(new{msg="Error Occured"});
            }
        }
        [HttpPost]
        [Route("reviewpayment")]
        public IActionResult ReviewPayment([FromBody] JobJobSeeker data){
            try{
                var slip= _context.SalarySlips.FirstOrDefault(s=>s.JobId==data.JobId && s.JobSeekerId==data.JobSeeker.JobSeekerId );
                if (slip==null){
                    SalarySlip ss=new SalarySlip();
                    ss.JobId=data.JobId;
                    ss.JobSeekerId=data.JobSeeker.JobSeekerId;
                    ss.JobSeekerName=data.JobSeeker.JobSeekerName;
                    ss. MobileNumber=data.JobSeeker.MobileNumber;
                    ss. JobDescription =data.Job.JobDescription;
                    ss. JobLocation =data.Job.JobLocation;
                    ss. FromDate = data.Job.FromDate;
                    ss. ToDate =data.Job.ToDate;
                    ss. WagePerDay =data.Job.WagePerDay;
                    ss. WorkingDays = CalculateWorkingDays(data.Job.FromDate, data.Job.ToDate);
                    ss. GrossSalary=(ss.WorkingDays*(int.Parse(ss.WagePerDay)));
                    ss. Deductions=CalculateDeductions();
                    ss. Allowances =CalculateAllowances();
                    ss.NetSalary =ss.GrossSalary-(ss.Deductions+ss.Allowances);
                    ss. PaymentStatus="Pending";
                    return Ok (ss);
                }
                else{
                    return Ok(slip);
                }
            }
            catch(Exception){
                return BadRequest(new {msg="Error Occured"});
            }
        }
          private int CalculateWorkingDays(DateTime fromDate, DateTime toDate)
        {
           
            int totalDays = (int)(toDate - fromDate).TotalDays;
            return totalDays + 1;
        }
         private decimal CalculateDeductions()
        {
            return 10;
        }

        private decimal CalculateAllowances()
        {
            return 5;
        }
        [HttpPost]
        [Route("makepayment")]
        public IActionResult MakePayment([FromBody] SalarySlip data){
            try{
                 SalarySlip ss=new SalarySlip();
                    ss.JobId=data.JobId;
                    ss.JobSeekerId=data.JobSeekerId;
                    ss.JobSeekerName=data.JobSeekerName;
                    ss. MobileNumber=data.MobileNumber;
                    ss. JobDescription =data.JobDescription;
                    ss. JobLocation =data.JobLocation;
                    ss. FromDate = data.FromDate;
                    ss. ToDate =data.ToDate;
                    ss. WagePerDay =data.WagePerDay;
                    ss. WorkingDays = CalculateWorkingDays(data.FromDate, data.ToDate);
                    ss. GrossSalary=(ss.WorkingDays*(int.Parse(ss.WagePerDay)));
                    ss. Deductions=CalculateDeductions();
                    ss. Allowances =CalculateAllowances();
                    ss.NetSalary =ss.GrossSalary-(ss.Deductions+ss.Allowances);
                    ss. PaymentStatus="Completed";
                    _context.SalarySlips.Add(ss);
                    _context.SaveChangesAsync();
                    return Ok(new {msg="Payment Successfull"});

            }
            catch(Exception){
                return BadRequest(new {msg="Error Occured"});
            }
        }
        [HttpGet]
        [Route("viewpayslip{id}")]
        public async Task<IActionResult> Viewpayslip(int id,[FromQuery] UserRequestModel requestModel){
            try{
                var slip=await _context.SalarySlips.FirstOrDefaultAsync(s=>s.JobId==id && s.JobSeekerId==requestModel.UserId );
                if (slip!=null){
                    return Ok(slip);
                }
                else{
                    return NotFound(new{msg="Not Found"});
                }

            }
            catch(Exception){
                return BadRequest(new{msg="Error Occured"});
            }
        }

>>>>>>> f176ac5fdad4dfb41d8b6e31f46660dac3968e1a
}
}
