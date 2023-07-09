import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jobseekermodel } from 'src/Models/jobseekermodel.class';
import { validationRules } from '../../auth/authsignup';
import { JobseekerdashboardComponent } from '../jobseekerdashboard/jobseekerdashboard.component';
import { ApiService } from 'src/Services/api.service';
import { IdserviceService } from 'src/Services/idservice.service';
import { AuthService } from 'src/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobseekerapplyjob',
  templateUrl: './jobseekerapplyjob.component.html',
  styleUrls: ['./jobseekerapplyjob.component.css']
})
export class JobseekerapplyjobComponent implements OnInit {
  form: FormGroup;
  jobseeker:Jobseekermodel=new Jobseekermodel;
  validationMessages = validationRules;
  dash!: JobseekerdashboardComponent;
  userId!: number;
  constructor(private formBuilder:FormBuilder,private apiservice:ApiService,private idservice :IdserviceService,private authservice:AuthService,private router: Router){
    this.form=this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Validates 10-digit phone number
      email: ['', [Validators.required, Validators.email]],
      yearsofexperience: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.getProile(); 
  }
  OnSubmit(){
    if (this.form.valid){
      this.jobseeker.jobSeekerName=this.form.value.name;
      this.jobseeker.email=this.form.value.email;
      this.jobseeker.address=this.form.value.address;
      this.jobseeker.mobileNumber=this.form.value.phonenumber;
      this.jobseeker.experience=this.form.value.yearsofexperience;
      this.apiservice.applyJob(this.idservice.JobId,this.jobseeker,this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
        (response)=>{
          console.log(response);
          this.form.reset();
          this.router.navigate(['/jobseeker/appliedJob']);
        },
        (error)=>{
          console.log(error.error);
        }
      );

    }
    else{
      console.log("Error in form");
    }
    
    

  }
  getProile(){
    this.apiservice.getProfile(this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response:Jobseekermodel)=>{
        this.jobseeker=response;
        this.form.patchValue({
          name: this.jobseeker.jobSeekerName,
          address: this.jobseeker.address,
          phonenumber: this.jobseeker.mobileNumber,
          email: this.jobseeker.email,
          yearsofexperience:this.jobseeker.experience
        });
        console.log(this.jobseeker);
      },
    )

  }
  
}

