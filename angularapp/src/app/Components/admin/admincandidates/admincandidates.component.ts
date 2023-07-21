import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Jobjobseekermodel } from 'src/Models/jobjobseekermodel.class';
import { Jobseekermodel } from 'src/Models/jobseekermodel.class';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { JobjobseekerService } from 'src/Services/jobjobseeker.service';


@Component({
  selector: 'app-admincandidates',
  templateUrl: './admincandidates.component.html',
  styleUrls: ['./admincandidates.component.css']
})
export class AdmincandidatesComponent implements OnInit {
  form: FormGroup;
  jobs: Jobjobseekermodel[] = [];
  jobjobs:Jobjobseekermodel[]=[];
  selectedCandidate: Jobseekermodel | null = null;
  

  constructor(
    private formBuilder: FormBuilder,
    private apiservice: ApiService,
    private authservice: AuthService,
    private router: Router,
    private jobjobseekerservice:JobjobseekerService
  ) {
    this.form = this.formBuilder.group({});
  }
  ngOnInit() {
    this.disableBackButton();
    this.getProfiles();
    this.getjobjobs();
  }
  getProfiles() {
    this.apiservice.getProfiles(this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response: Jobjobseekermodel[]) => {
        this.jobs = response;
        console.log(response);
      },
      (error: any) => {
        console.log(error.error);
      }
    );
  }
  disableBackButton() {
    history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }
  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return false;
  }
  getjobjobs() {
    this.apiservice.CheckStatus(this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response:Jobjobseekermodel[])=>{
        this.jobjobs=response;
        console.log(this.jobjobs);
      }
    );
  }
  ForEditJob(job:Jobjobseekermodel){
    this.jobjobseekerservice.jobjobs=job;
    console.log(this.jobjobseekerservice.jobjobs);
  }
  Delete(jobid:number,jobseekerid:number):void{
       this.apiservice.deleteProfile(jobid,jobseekerid,this.authservice.getUserRole()).subscribe(
        (response:any)=>{
          console.log(response);
          this.reloadCurrentRoute();
        },
        (error)=>{
          console.log(error);
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


