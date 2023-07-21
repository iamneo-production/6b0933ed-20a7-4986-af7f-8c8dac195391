import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Jobmodel } from 'src/Models/jobmodel.class';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-customeraddjob',
  templateUrl: './customeraddjob.component.html',
  styleUrls: ['./customeraddjob.component.css']
})
export class CustomeraddjobComponent implements OnInit {
  form: FormGroup;
  jobdata:Jobmodel=new Jobmodel();
  constructor(private formBuilder: FormBuilder, private authservice:AuthService,private apiservice:ApiService,private router :Router){
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
    this.disableBackButton();
    
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
  
  
  
  
  OnSubmit(){
    if (this.form.valid){
      this.jobdata.jobDescription=this.form.value.jobDescription;
      this.jobdata.jobLocation=this.form.value.jobLocation;
      this.jobdata.fromDate=this.form.value.fromDate;
      this.jobdata.toDate=this.form.value.toDate;
      this.jobdata.wagePerDay=this.form.value.wagesPerDay;
      this.jobdata.mobileNumber=this.form.value.mobileNumber;
      console.log(this.jobdata);
      this.apiservice.AddJob(this.jobdata,this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
        (response: any) => {
          console.log(response);
          this.form.reset();
          this.router.navigate(['/customer/dashboard'])
          
    },
    (error: any) => {
      console.log(error.error);
      this.form.reset();
    });

    }
}
}


