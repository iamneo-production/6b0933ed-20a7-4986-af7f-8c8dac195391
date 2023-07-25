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
    [Route("user")]
    public class UserController:ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly JobseekerController _jobseekercontroller;
        private readonly AdminController _admincontroller;


        public UserController(MyDbContext context, JobseekerController jobseekercontroller,AdminController admincontroller){
            _context=context;
            _jobseekercontroller=jobseekercontroller;
            _admincontroller=admincontroller;
       
    }
    [HttpGet]
    [Route("dashboard")]
    public IActionResult Dashboard([FromQuery] UserRequestModel requestModel){
        try{
        if (requestModel.userRole=="Jobseeker"){
            return Ok(_jobseekercontroller.GetJobs());

        }
        else {
            return Ok(_admincontroller.GetAllJobs(requestModel));
        }
        }
        catch (Exception ){
            return BadRequest();
        }

    }
        
    }
}