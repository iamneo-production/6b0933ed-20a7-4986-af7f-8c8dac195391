import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Jobjobseekermodel } from 'src/Models/jobjobseekermodel.class';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { IdserviceService } from 'src/Services/idservice.service';

@Component({
  selector: 'app-jobseekerappliedjob',
  templateUrl: './jobseekerappliedjob.component.html',
  styleUrls: ['./jobseekerappliedjob.component.css']
})
export class JobseekerappliedjobComponent implements OnInit {
  selectedJob: any; 
  selectedUser: Jobjobseekermodel | null = null;
  showChat: boolean = false;
  jobs: Jobjobseekermodel[] = [];
  jobjobs:Jobjobseekermodel[]=[];
  jobid!:number;
  filteredJobs: Jobjobseekermodel[]=[];
  searchTerm: string='';
  showPaymentslip: boolean = false;
  constructor(private apiservice:ApiService, private authservice:AuthService,private router: Router,private idservice:IdserviceService){
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
    this.getjobjobs();
  }
  
  ChangeStatus(jobId:number){
    const jobjobs1=this.jobjobs.find(job => job.jobId === jobId);
    var jjs=new Jobjobseekermodel();
    jjs.jobId=jobjobs1.jobId;
    jjs.status="Completed";
    jjs.jobSeeker=jobjobs1.jobSeeker;
    jjs.job=jobjobs1.job;
    this.apiservice.ChangeStatus(jjs,this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response:any)=>{
       this.AppliedJobs();
      }
    );
}
viewPaymentslip(job: Jobjobseekermodel) {
  console.log("hello");
  console.log(job.jobId);
  this.selectedJob=job
  this.showPaymentslip = true;
}
closePaymentslip() {
  this.showPaymentslip = false; 
}
reloadCurrentRoute() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigateByUrl(currentUrl);
  });
}
  
  AppliedJobs(): void{
    this.apiservice.appliedJob(this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response:Jobjobseekermodel[])=>{
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
          job.job.jobDescription.toLowerCase().includes(lowerCaseTerm) ||
          job.job.jobLocation.toLowerCase().includes(lowerCaseTerm) ||
          job.job.wagePerDay.toLowerCase().includes(lowerCaseTerm) ||
          job.job.fromDate.toString().toLowerCase().includes(lowerCaseTerm) ||
          job.job.toDate.toString().toLowerCase().includes(lowerCaseTerm)
        );
      });
    } 
    else {
      this.filteredJobs = this.jobs;
    }
  
  }
  openChat(candidate:Jobjobseekermodel) {
    this.showChat = true;
    this.selectedUser = candidate;
  }
  ChatBox(candidate: Jobjobseekermodel,jobId:number){
    this.openChat(candidate);
    this.idservice.JobId=jobId;
    console.log("jobbox");
    console.log(jobId);
  }

  closeChat() {
    this.showChat = false;
    this.selectedUser = null;
  
  }
  getjobjobs() {
    this.apiservice.CheckStatus(this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response:Jobjobseekermodel[])=>{
        this.jobjobs=response;
        console.log(this.jobjobs);
      }
    );
  }
  myFunction(jobId:number):void {
    let text = "Are you Confirm to make this Job Completed?";
    if (confirm(text) == true) {
      this.ChangeStatus(jobId);
    }
    document.getElementById("demo").innerHTML = text;
  }

}

  
  