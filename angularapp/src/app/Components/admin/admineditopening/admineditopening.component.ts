import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Jobmodel } from 'src/Models/jobmodel.class';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { JobserviceService } from 'src/Services/jobservice.service';

@Component({
  selector: 'app-admineditopening',
  templateUrl: './admineditopening.component.html',
  styleUrls: ['./admineditopening.component.css']
})
export class AdmineditopeningComponent implements OnInit {
  form: FormGroup;
  jobdata:Jobmodel=new Jobmodel();
  constructor(private formBuilder: FormBuilder, private jobservice:JobserviceService,private authservice:AuthService,private apiservice:ApiService,private router :Router){
    this.form = this.formBuilder.group({
      jobDescription: [''],
      jobLocation: [''],
      fromDate: [''],
      toDate: [''],
      wagesPerDay: [''],
      mobileNumber:['']
    });

  }
  ngOnInit(){
    this.jobdata=this.jobservice.job;
    this.SetJob();

  }
  SetJob(){
    this.form.patchValue({
      jobDescription: this.jobdata.jobDescription,
      jobLocation: this.jobdata.jobLocation,
      fromDate :formatDate(new Date(this.jobdata.fromDate), 'yyyy-MM-dd', 'en-US'),
      toDate :formatDate(new Date(this.jobdata.toDate), 'yyyy-MM-dd', 'en-US'),
      wagesPerDay:this.jobdata.wagePerDay,
      mobileNumber:this.jobdata.mobileNumber
    });

  }
  OnSubmit(){
    if (this.form.valid){
      this.jobdata.jobDescription=this.form.value.jobDescription;
      this.jobdata.jobLocation=this.form.value.jobLocation;
      this.jobdata.fromDate=this.form.value.fromDate;
      this.jobdata.toDate=this.form.value.toDate;
      this.jobdata.wagePerDay=this.form.value.wagesPerDay;
      this.jobdata.mobileNumber=this.form.value.mobileNumber;
      console.log(this.jobdata);
      this.apiservice.EditJob(this.jobdata.jobId,this.jobdata,this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
        (response: any) => {
          console.log(response);
          this.form.reset();
          this.router.navigate(['/admin/getAllJobs'])
          
    },
    (error: any) => {
      console.log(error.error);
      this.form.reset();
    });

    }
}

}
