import { Component, OnInit } from '@angular/core';
import { Jobmodel } from 'src/Models/jobmodel.class';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-jobseekerappliedjob',
  templateUrl: './jobseekerappliedjob.component.html',
  styleUrls: ['./jobseekerappliedjob.component.css']
})
export class JobseekerappliedjobComponent implements OnInit {

  jobs: Jobmodel[] = [];
  jobid!:number;
  filteredJobs: Jobmodel[]=[];
  searchTerm: string='';
  constructor(private apiservice:ApiService, private authservice:AuthService){
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
    this.AppliedJobs();
    this.filterJobs();
   
  }
  
  AppliedJobs(): void{
    this.apiservice.appliedJob(this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response:Jobmodel[])=>{
        this.jobs=response;
        this.filteredJobs = this.jobs;
        console.log(this.jobs);
      },
      (error)=>{
        console.log(error.error);
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
  }
  