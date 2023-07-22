import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jobmodel } from 'src/Models/jobmodel.class';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { IdserviceService } from 'src/Services/idservice.service';
import { JobserviceService } from 'src/Services/jobservice.service';

@Component({
  selector: 'app-adminopenings',
  templateUrl: './adminopenings.component.html',
  styleUrls: ['./adminopenings.component.css']
})
export class AdminopeningsComponent implements OnInit {
  jobs: Jobmodel[] = [];
  jobid!:number;
  filteredJobs: Jobmodel[]=[];
  searchTerm: string='';
  constructor(private apiservice:ApiService,
     private authservice:AuthService,
     private idservice:IdserviceService,
     private router:Router,
     private jobservice:JobserviceService){
    this.filteredJobs = this.jobs;
  }
  isJobExpired(job: any): boolean {
    const currentDate = new Date();
    const toDate = new Date(job.toDate);
    return toDate < currentDate;
  }
  isJobAvailable(job: any): boolean {
    const currentDate = new Date();
    const toDate = new Date(job.toDate);
    return toDate >= currentDate;
  }
  
  ngOnInit():void{
    this.getJobs();
    this.filterJobs();
   
  }
  AssignJobId(id:number):void{
    this.jobid=id;
    this.idservice.JobId=id;
    console.log(this.jobid);
  }
  GetJobDetails(job:Jobmodel){
    this.jobservice.job=job;
  }
  getJobs(): void{
    const userId=this.authservice.getUserId();
    this.apiservice.admingetJobs(this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response:Jobmodel[])=>{
        this.jobs=response;
        this.filteredJobs = this.jobs;
        console.log(this.jobs);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  filterJobs() {
    if (this.searchTerm) {
      const lowerCaseTerm = this.searchTerm.toLowerCase();
      this.filteredJobs = this.jobs.filter((job) => {
        return (
          job.jobDescription.toLowerCase().includes(lowerCaseTerm) ||
          job.jobLocation.toLowerCase().includes(lowerCaseTerm) ||
          job.wagePerDay.toLowerCase().includes(lowerCaseTerm) ||
          job.fromDate.toString().toLowerCase().includes(lowerCaseTerm) ||
          job.toDate.toString().toLowerCase().includes(lowerCaseTerm)
        );
      });
    } 
    else {
      this.filteredJobs = this.jobs;
    }

}
Delete(jobId:number):void{
  this.apiservice.deleteJob(jobId,this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
    (response)=>{
      console.log(response)
      this.reloadCurrentRoute();
    },
    (error)=>{
      console.log(error.error);
    }
  )

}
reloadCurrentRoute() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigateByUrl(currentUrl);
  });
}

}

