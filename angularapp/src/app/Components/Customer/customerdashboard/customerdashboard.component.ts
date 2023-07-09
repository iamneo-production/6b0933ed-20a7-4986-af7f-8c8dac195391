import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jobmodel } from 'src/Models/jobmodel.class';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { JobserviceService } from 'src/Services/jobservice.service';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerdashboardComponent implements OnInit {
  jobs: Jobmodel[] = [];
  filteredJobs: Jobmodel[]=[];
  searchTerm: string='';
  isLoading: true;
  constructor(private apiservice:ApiService, private jobservice:JobserviceService,private authservice:AuthService,private router:Router){
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
    this.getJob();
    this.filterJobs();
    this.disableBackButton();
   
  }
  disableBackButton() {
    history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return false;
  }
   
  getJob(): void {
    this.apiservice.getJobs(this.authservice.getUserId(), this.authservice.getUserRole()).subscribe(
      (values: any[]) => {
        console.log(values);
        this.jobs=values;
        this.filteredJobs = values;
      },
      (error: any) => {
        console.log(error);
      }
    );
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
  GetJobDetails(job:Jobmodel){
    this.jobservice.job=job;
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
reloadCurrentRoute() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigateByUrl(currentUrl);
  });
}
startloading(){
  if (this.isLoading){
  setTimeout(() => {
  });
}
}
}

