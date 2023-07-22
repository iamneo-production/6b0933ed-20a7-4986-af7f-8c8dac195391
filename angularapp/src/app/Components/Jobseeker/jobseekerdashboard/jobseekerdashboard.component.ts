import { Component, OnInit } from '@angular/core';
import { Jobjobseekermodel } from 'src/Models/jobjobseekermodel.class';
import { Jobmodel } from 'src/Models/jobmodel.class';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { IdserviceService } from 'src/Services/idservice.service';

@Component({
  selector: 'app-jobseekerdashboard',
  templateUrl: './jobseekerdashboard.component.html',
  styleUrls: ['./jobseekerdashboard.component.css']
})
export class JobseekerdashboardComponent implements OnInit {
  jobs: Jobmodel[] = [];
  jobid!: number;
  filteredJobs: Jobmodel[] = [];
  searchTerm: string = '';
  appliedjobs:Jobjobseekermodel[]=[];

  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private idservice: IdserviceService
  ) {
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

  ngOnInit(): void {
    this.getJobs();
    this.filterJobs();
    this.getAppliedJobs();
  }
  getAppliedJobs() {
    this.apiservice.appliedJob(this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response:Jobjobseekermodel[])=>{
        this.appliedjobs=response;
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  AssignJobId(id: number): void {
    this.jobid = id;
    this.idservice.JobId = id;
    console.log(this.jobid);
  }

  getJobs(): void {
    this.apiservice.getJobs(this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (values: any[]) => {
        this.jobs = values;
        this.filteredJobs = values;
        console.log(this.jobs);
        console.log(values);
      },
      (error)=>{
        console.log(error.error);
      }
    );
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
    } else {
      this.filteredJobs = this.jobs;
    }
  }

 isJobAlreadyApplied(jobId:number): boolean{
  for (let i = 0; i < this.appliedjobs.length; i++) {
    if (this.appliedjobs[i].jobId==jobId){
      return true;
    }
  }
  return false;
  
 }
  
  }
