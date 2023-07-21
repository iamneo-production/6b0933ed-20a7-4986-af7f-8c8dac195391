using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class SalarySlip
    {
        [Key]
        public int PaymentId { get; set; }
        public int JobId { get; set; }
        public int JobSeekerId {get;set;}
        public string JobSeekerName {get;set;}
        public string MobileNumber { get; set; }
        public string JobDescription { get; set; }
        public string JobLocation { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string WagePerDay { get; set; }
        public int WorkingDays { get; set; }
        public decimal GrossSalary { get; set; }
        public decimal Deductions { get; set; }
        public decimal Allowances { get; set; }
        public decimal NetSalary { get; set; }
        public string PaymentStatus{get;set;}
    }
}