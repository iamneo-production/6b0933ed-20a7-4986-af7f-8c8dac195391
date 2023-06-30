using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace dotnetapp.Controllers
{
    [Route("admin")]
    [ApiController]
public class AdminController : ControllerBase
{
    [HttpGet("Profile")]
    public IActionResult GetProfile()
    {
        // Implement the logic to retrieve and return the admin profile.
        // You can customize the code according to your application's requirements.
        var profile = new { Name = "Admin", Role = "Admin" };
        return Ok(profile);
    }

    [HttpGet("getAlljobs")]
    public IActionResult GetAllJobs()
    {
        // Implement the logic to retrieve and return all jobs.
        // You can customize the code according to your application's requirements.
        var jobs = new List<string> { "Job 1", "Job 2", "Job 3" };
        return Ok(jobs);
    }
}
}