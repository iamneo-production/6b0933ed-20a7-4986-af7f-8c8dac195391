using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<JobSeeker> JobSeekers { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobJobSeeker> JobJobSeekers { set; get; }
        public DbSet<Login> Logins { get; set; }
        public DbSet<SignUp> SignUps { get; set; }
        public DbSet<ChatMessage> ChatMessages{get; set;}
        public DbSet<SalarySlip> SalarySlips {get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Configure the relationship and table names

            //User Table
            modelBuilder.Entity<User>()
                .Property(u => u.UserId)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<User>()
               .HasMany(u => u.Jobs)
               .WithOne(j => j.User)
               .HasForeignKey(j => j.UserId)
               .IsRequired();

            //Job Table
            modelBuilder.Entity<Job>()
                .Property(j => j.JobId)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Job>()
                .HasMany(j => j.JobJobSeekers)
                .WithOne(jj => jj.Job)
                .HasForeignKey(jj => jj.JobId);

            //JobSeeker Table
            modelBuilder.Entity<JobSeeker>()
                .Property(js => js.JobSeekerId)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<JobSeeker>()
                .HasMany(js => js.JobJobSeekers)
                .WithOne(jj => jj.JobSeeker)
                .HasForeignKey(jj => jj.JobSeekerId);

            //JobJobSeeker Table
            modelBuilder.Entity<JobJobSeeker>()
                .HasKey(jj => new { jj.JobId, jj.JobSeekerId });

            //Configure table names
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Job>().ToTable("Jobs");
            modelBuilder.Entity<JobSeeker>().ToTable("JobSeekers");
            modelBuilder.Entity<JobJobSeeker>().ToTable("JobJobSeeker");

            //Configure SalarySlip 
             modelBuilder.Entity<SalarySlip>()
                .Property(s => s.GrossSalary)
                .HasColumnType("decimal(18, 2)"); // Adjust the precision and scale as per your requirements

            modelBuilder.Entity<SalarySlip>()
                .Property(s => s.NetSalary)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<SalarySlip>()
                .Property(s => s.Allowances)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<SalarySlip>()
                .Property(s => s.Deductions)
                .HasColumnType("decimal(18, 2)");
        }

    }
}


