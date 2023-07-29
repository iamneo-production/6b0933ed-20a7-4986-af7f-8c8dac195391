import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formBuilderConfig, validationRules } from '../auth/authlogin';
import { Router } from '@angular/router';
import { NotificationService } from 'src/Services/notification.service';
import { Loginmodel } from 'src/Models/loginmodel.class';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  form: FormGroup;
  logindata: Loginmodel = new Loginmodel();
  validationMessages = validationRules;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiservice: ApiService,
    private notificationservice: NotificationService,
    private authservice:AuthService
  ) {
    this.form = this.formBuilder.group(formBuilderConfig);
  }
  ngOnInit(): void {
  }

  OnSubmit(form: FormGroup) {
    this.isLoading=true;
    console.log(form.value);
    if (form.valid) {
      this.logindata.Email = form.value.email;
      this.logindata.Password = form.value.password;
      this.logindata.UserRole = form.value.userRole;
      if (this.logindata.Email!="admin@gmail.com"&& this.logindata.Password!="Admin@123"){
      this.apiservice.userLogin(this.logindata).subscribe(
        (response: any) => {
          this.isLoading=false;
          console.log(response);
          this.form.reset();
          this.authservice.login(response.token);
          if ((this.authservice.getUserRole()=="Admin")){
            this.router.navigate(['/admin']);
          }
          if ((this.authservice.getUserRole()=="User")){
            this.router.navigate(['/customer']);
          }
          else{
            this.router.navigate(['/jobseeker']);
          }
          ;
        },
        (error: any) => {
          this.isLoading=false;
          console.log(error.error);
          if (error.status === 401) {
            console.log('Error 401');
            this.notificationservice.showLoginError('Login Failed');
            this.form.reset();
            this.router.navigate(['/user/login']);
          } else {
            this.notificationservice.showLoginError('An error occurred during Login.');
            this.form.reset();
            this.router.navigate(['/user/login']);
          }
        }
      );
      }
      else{
        this.apiservice.adminLogin(this.logindata).subscribe(
          (response: any) => {
            this.isLoading=false;
            console.log(response);
            this.form.reset();
            this.authservice.login(response.token);
            if ((this.authservice.getUserRole()=="Admin")){
              this.router.navigate(['/admin']);
            }
          },
          (error: any) => {
            this.isLoading=false;
            console.log(error.error);
            if (error.status === 401) {
              console.log('Error 401');
              this.notificationservice.showLoginError('Login Failed');
              this.form.reset();
              this.router.navigate(['/user/login']);
            } else {
              this.notificationservice.showLoginError('An error occurred during Login.');
              this.form.reset();
              this.router.navigate(['/user/login']);
            }
          }
        );
      }
    } else {
      this.notificationservice.showLoginError('Please fix the errors in the form.');
    }
  }
  startloading(){
    if (this.isLoading){
    setTimeout(() => {
    });
  }
  }

}