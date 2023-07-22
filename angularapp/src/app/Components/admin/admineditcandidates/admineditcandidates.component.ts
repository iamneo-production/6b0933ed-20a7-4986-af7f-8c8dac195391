import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jobseekermodel } from 'src/Models/jobseekermodel.class';
import { validationRules } from '../../auth/authsignup';
import { ApiService } from 'src/Services/api.service';
import { IdserviceService } from 'src/Services/idservice.service';
import { AuthService } from 'src/Services/auth.service';
import { Router } from '@angular/router';
import { JobjobseekerService } from 'src/Services/jobjobseeker.service';
import { Jobjobseekermodel } from 'src/Models/jobjobseekermodel.class';

@Component({
  selector: 'app-admineditcandidates',
  templateUrl: './admineditcandidates.component.html',
  styleUrls: ['./admineditcandidates.component.css']
})
export class AdmineditcandidatesComponent implements OnInit {

  form: FormGroup;
  jobseeker:Jobseekermodel=new Jobseekermodel;
  job:Jobjobseekermodel=new Jobjobseekermodel;
  validationMessages = validationRules;

  userId!: number;
  constructor(private formBuilder:FormBuilder,
    private apiservice:ApiService,
    private idservice :IdserviceService,
    private authservice:AuthService,
    private jobjobseeker:JobjobseekerService,
    private router: Router){
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
      this.apiservice.editProfile(Number(this.job.jobSeeker.jobSeekerId),this.jobseeker,this.authservice.getUserId(),this.authservice.getUserId()).subscribe(
        (response:any)=>{
          console.log(response);
          this.form.reset();
          this.router.navigate(['/admin/profile']);
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
        this.job=this.jobjobseeker.jobjobs;
        this.form.patchValue({
          name: this.job.jobSeeker.jobSeekerName,
          address: this.job.jobSeeker.address,
          phonenumber: this.job.jobSeeker.mobileNumber,
          email: this.job.jobSeeker.email,
          yearsofexperience:this.job.jobSeeker.experience
        });
        console.log(this.jobseeker);
      }
    

  }
  


