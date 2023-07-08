using System;
<<<<<<< HEAD
=======
using System.Text;
>>>>>>> 662c039b3c7ea92ea146fee9c1db87fd9fbaf633
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
<<<<<<< HEAD
=======
using dotnetapp.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using dotnetapp.Service;
using dotnetapp.Controllers;
>>>>>>> 662c039b3c7ea92ea146fee9c1db87fd9fbaf633

namespace dotnetapp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
<<<<<<< HEAD
            //string connectionString = Configuration.GetConnectionString("myconnstring");
           // services.AddDbContext<ProductDBContext>(opt => opt.UseSqlServer(connectionString));
           // services.AddScoped<IProductService, ProductService>();
=======
            string connectionString = Configuration.GetConnectionString("myconnstring");
            services.AddDbContext<MyDbContext>(opt => opt.UseSqlServer(connectionString));
            services.AddScoped<JobseekerController>();
            services.AddScoped<AdminController>();
            services.AddScoped<UserController>();

           services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme). AddJwtBearer(
options =>{
    options.TokenValidationParameters=new TokenValidationParameters{
        ValidateIssuer=true,
        ValidateAudience=true,
        ValidateLifetime=true,
        ValidateIssuerSigningKey = true,
        ValidIssuer="Issuer.in",
        ValidAudience="Reader",
        IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes("THis_is_$%4675_Key_I^%$%^_hanve_Genereted"))
    };
});
>>>>>>> 662c039b3c7ea92ea146fee9c1db87fd9fbaf633
            services.AddCors();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "dotnetapp", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "dotnetapp v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
<<<<<<< HEAD
=======
            app.UseAuthentication();
>>>>>>> 662c039b3c7ea92ea146fee9c1db87fd9fbaf633

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
