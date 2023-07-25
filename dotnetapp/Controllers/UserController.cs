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
<<<<<<< HEAD
=======
        [HttpPost]
        [Route("sendMessage")]
        public async Task<IActionResult> SendMessage([FromBody]ChatMessage message)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(message.Message))
                {
                    return BadRequest("Message text is required.");
                }
                message.Timestamp = DateTime.UtcNow;
                var Message = new ChatMessage
                {
                    Timestamp = message.Timestamp,
                    Recipient = message.Recipient,
                    Sender=message.Sender,
                    Message = message.Message,
                    SenderId =message.SenderId,
                    RecipientId=message.RecipientId,
                    JobId=message.JobId

                };

                _context.ChatMessages.Add(Message);
                await _context.SaveChangesAsync();

                return Ok(Message);
            }
            catch (Exception )
            {
               return BadRequest(new { Msg = "Error Occured" });
            }
        }
        [HttpGet]
        [Route("getchat/{id}/{jobid}")]
        public IActionResult GetChat(string id,int jobid,[FromQuery] UserRequestModel requestModel)
        {
            try{
                //   var messages = _context.ChatMessages.ToList(); 
           var messages = _context.ChatMessages
            .Where(c => (c.SenderId == requestModel.UserId.ToString() && c.RecipientId == id)
                        || (c.SenderId == id && c.RecipientId == requestModel.UserId.ToString()) )
            .ToList();
            var matchedJobMessages = messages.Where(m => m.JobId == jobid).ToList();

            return Ok(matchedJobMessages);
            }
            catch(Exception){
                return BadRequest(new { Msg = "Error Occured" });
            }
        }
     
>>>>>>> f176ac5fdad4dfb41d8b6e31f46660dac3968e1a
        
    }
}