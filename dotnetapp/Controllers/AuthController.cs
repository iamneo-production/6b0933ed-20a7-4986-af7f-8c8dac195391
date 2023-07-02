using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("user")]
    public class AuthController : ControllerBase
    {
        private readonly MyDbContext _context;


        public AuthController(MyDbContext context)
        {
            _context = context;

        }
        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUp data)
        {
            if (ModelState.IsValid)
            {   
            if (data.userRole=="User"){
                var existuser=await _context.Users.FirstOrDefaultAsync(u=> u.Email==data.Email);
                if (existuser!=null){
                    return Conflict(new{msg="User Already Exists"});
                }
                var user = new User
                    {
                        UserName = data.username,
                        MobileNumber = data.mobileNumber,
                        Password = data.Password,
                        Email = data.Email,
                        UserRole = data.userRole
                    };
                    _context.Users.Add(user);
               
            }
            if (data.userRole=="Admin"){
                var existAdmin=await _context.Admins.FirstOrDefaultAsync(a=>a.Email==data.Email);
                if (existAdmin!=null){
                    return Conflict(new{msg="Admin Already Exists"});
                }
                 var admin = new Admin
                    {
                        AdminName = data.username,
                        MobileNumber = data.mobileNumber,
                        Email = data.Email,
                        Password = data.Password,
                        UserRole = data.userRole
                    };
                _context.Admins.Add(admin);
                
            }
            if (data.userRole=="Jobseeker"){
                var existseeker=await _context.JobSeekers.FirstOrDefaultAsync(js=>js.Email==data.Email);
                if (existseeker!=null){
                    return Conflict(new{msg="Jobseeker Already Exists"});
                }
                var jobseeker = new JobSeeker
                    {
                        JobSeekerName = data.username,
                        MobileNumber = data.mobileNumber,
                        Email = data.Email,
                        Password = data.Password,
                        UserRole = data.userRole
                    };
                    _context.JobSeekers.Add(jobseeker);
                    
            }
            await _context.SaveChangesAsync();
            return Created("",new{Msg="Successfully Registered"});
                    
            }
            return BadRequest(); 
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Login data)
        {
            bool isAuthenticated=false;
            if (data.UserRole=="User"||data.UserRole=="Jobseeker"){
                isAuthenticated = await IsUserPresent(data);
            }
            else{
                isAuthenticated = await IsAdminPresent(data);
            } 
            if (!isAuthenticated)
            {
                return Unauthorized("Invalid email, password, or user role.");
            }

            // Generate JWT token
            string token = await GenerateTokenAsync(data);
            return Ok(new { Token = token });
        }
        private async Task<bool> IsUserPresent(Login data)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == data.Email);
            var jobseeker = await _context.JobSeekers.FirstOrDefaultAsync(js => js.Email == data.Email);
            if (user != null && VerifyPassword(data.Password, user.Password) && data.UserRole == user.UserRole)
            {
                return true;
            }
            else if (jobseeker != null && VerifyPassword(data.Password, jobseeker.Password) && data.UserRole == jobseeker.UserRole)
            {
                return true;
            }
            else{
                return false;
            }

        }
        private async Task<bool> IsAdminPresent(Login data){
            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Email == data.Email);
            if (admin!=null && VerifyPassword(data.Password,admin.Password)&& data.UserRole==admin.UserRole){
                return true;
            }
            else{
                return false;
            }

        }

        private static bool VerifyPassword(string password1, string password2)
        {
            if (password1 == password2)
            {
                return true;
            }
            else return false;
        }

        private async Task<string> GenerateTokenAsync(Login data)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("THis_is_$%4675_Key_I^%$%^_hanve_Genereted"));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256Signature);
            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Email == data.Email&& a.UserRole==data.UserRole);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == data.Email&& u.UserRole==data.UserRole);
            var jobseeker = await _context.JobSeekers.FirstOrDefaultAsync(js => js.Email == data.Email&& js.UserRole==data.UserRole);
            var claims = new List<Claim>();
            if (admin != null)
            {


                claims.Add(new Claim(ClaimTypes.NameIdentifier, admin.AdminId.ToString()));
                claims.Add(new Claim(ClaimTypes.Email, admin.Email));
                claims.Add(new Claim(ClaimTypes.Role, admin.UserRole));


            }
            else if (user != null)
            {

                claims.Add(new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()));
                claims.Add(new Claim(ClaimTypes.Email, user.Email));
                claims.Add(new Claim(ClaimTypes.Role, user.UserRole));

            }
            else
            {

                claims.Add(new Claim(ClaimTypes.NameIdentifier, jobseeker.JobSeekerId.ToString()));
                claims.Add(new Claim(ClaimTypes.Email, jobseeker.Email));
                claims.Add(new Claim(ClaimTypes.Role, jobseeker.UserRole));


            }
            var token = new JwtSecurityToken(
                issuer: "Issuer.in",
                audience: "Reader",
                expires: DateTime.Now.AddHours(1),
                claims: claims,
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
 