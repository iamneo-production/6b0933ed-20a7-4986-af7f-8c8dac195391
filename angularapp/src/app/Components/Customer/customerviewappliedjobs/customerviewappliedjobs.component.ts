import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { Jobjobseekermodel } from 'src/Models/jobjobseekermodel.class';
import { IdserviceService } from 'src/Services/idservice.service';

@Component({
  selector: 'app-customerviewappliedjobs',
  templateUrl: './customerviewappliedjobs.component.html',
  styleUrls: ['./customerviewappliedjobs.component.css']
})
export class CustomerviewappliedjobsComponent implements OnInit {
  selectedJob: any; 
  form: FormGroup;
  jobs: Jobjobseekermodel[] = [];
  // jobjobs:Jobjobseekermodel[]=[];
  selectedCandidate: Jobjobseekermodel | null = null;
  showChat: boolean = false;
  messages: any[] = [];
  newMessage: string = '';
  showPaymentReview: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private apiservice: ApiService,
    private authservice: AuthService,
    private router: Router,
    private idservice:IdserviceService
  ) {
    this.form = this.formBuilder.group({});
  }
  ngOnInit() {
    this.disableBackButton();
    this.getProfiles();
  }
  openPaymentReview(job: any) {
    this.selectedJob = job;
    this.showPaymentReview = true;
  }
  cancelPayment() {
    this.showPaymentReview = false;
  }
  getProfiles() {
    this.apiservice.getProfiles(this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response: Jobjobseekermodel[]) => {
        this.jobs = response;
        console.log("hello");
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
  openChat(candidate: Jobjobseekermodel) {
    this.showChat = true;
    this.selectedCandidate = candidate;
  }
  ChatBox(candidate: Jobjobseekermodel,jobId:number){
    this.openChat(candidate);
    this.idservice.JobId=jobId;
    console.log("jobbox");
    console.log(jobId);
  }
  closeChat() {
    this.showChat = false;
    this.selectedCandidate = null;
  }
  addRating(rating :string){
    this.apiservice.addRating(Number(rating),this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (Response:any)=>{
        this.getProfiles();
        console.log(Response);
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }
  assignjob(js:Jobjobseekermodel):void {
    let text = "Do you like to assign job to "+js.jobSeeker.jobSeekerName;
    if (confirm(text) == true) {
      this.ChangeStatus(js.jobId);
    }
    document.getElementById("demo").innerHTML = text;
  }
  ChangeStatus(jobId:number){
    const jobjobs1=this.jobs.find(job => job.jobId === jobId);
    var jjs=new Jobjobseekermodel();
    jjs.jobId=jobjobs1.jobId;
    jjs.status="Selected";
    jjs.jobSeeker=jobjobs1.jobSeeker;
    jjs.job=jobjobs1.job;
    this.apiservice.ChangeStatus(jjs,this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response:any)=>{
      this.getProfiles();
      }
    );
}

}

