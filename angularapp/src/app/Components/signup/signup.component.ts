import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { formBuilderConfig, passwordMatchValidator, validationRules } from '../auth/authsignup';
import { Signupmodel } from 'src/Models/signupmodel.class';
import { NotificationService } from 'src/Services/notification.service';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  validationMessages = validationRules;
  data:Signupmodel=new Signupmodel();
  isLoading: boolean =false;
  constructor(private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private apiservice:ApiService) {
    this.form = this.formBuilder.group(formBuilderConfig, {
      validators: passwordMatchValidator,
      
    });
  }

  ngOnInit(): void {
  }
  OnSubmit(form: FormGroup): void {
    this.isLoading=true;
    console.log(form.value);
    if (form.valid) {
      this.data.username = this.form.value.username;
      this.data.email = this.form.value.email;
      this.data.password = this.form.value.password;
      this.data.mobileNumber = this.form.value.mobileNumber;
      this.data.userRole = this.form.value.userRole;
      console.log(this.data);
      if (this.data.userRole=="Admin"){
        this.apiservice.adminSignup(this.data).subscribe(
          (response: any) => {
            this.isLoading=false;
            console.log(response); 
            this.notificationService.showSuccess('Successfully Registered!');
            this.form.reset();
            this.router.navigate(['/user/login']);
          },
          (error:any) => {
            this.isLoading=false;
            console.log(error.error)
            if (error.status === 409) {
              this.notificationService.showError('Email already exists.');
              this.form.reset();
              this.router.navigate(['/user/signup']);
            }
            else {
              this.notificationService.showError('An error occurred during registration.');
              this.form.reset();
              this.router.navigate(['/user/signup']);
            }
          }
        );

      }
      else{
      this.apiservice.userSignup(this.data).subscribe(
        (response: any) => {
          this.isLoading=false;
          console.log(response); 
          this.notificationService.showSuccess('Successfully Registered!');
          this.form.reset();
          this.router.navigate(['/user/login']);
        },
        (error:any) => {
          this.isLoading=false;
          console.log(error.error)
          if (error.status === 409) {
            this.notificationService.showError('Email already exists.');
            this.form.reset();
            this.router.navigate(['/user/signup']);
          }
          else {
            this.notificationService.showError('An error occurred during registration.');
            this.form.reset();
            this.router.navigate(['/user/signup']);
          }
        }
      );
      }
    } else {
      this.notificationService.showError('Please fix the errors in the form.');
    }

  }
  startloading(){
    if (this.isLoading){
    setTimeout(() => {
    });
  }
  }
}