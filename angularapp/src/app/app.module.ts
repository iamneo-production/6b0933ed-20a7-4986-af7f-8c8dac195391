<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
=======
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule,} from '@angular/forms';
import { ApiService } from 'src/Services/api.service';
import { NotificationService } from 'src/Services/notification.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/Services/auth.service';
import { CustomernavigationComponent } from './Components/Customer/customernavigation/customernavigation.component';
import { CustomerdashboardComponent } from './Components/Customer/customerdashboard/customerdashboard.component';
import { CustomeraddjobComponent } from './Components/Customer/customeraddjob/customeraddjob.component';
import { CustomerviewappliedjobsComponent } from './Components/Customer/customerviewappliedjobs/customerviewappliedjobs.component';
import { CustomereditjobComponent } from './Components/Customer/customereditjob/customereditjob.component';
import { AuthGuard } from 'src/Services/authguard.service';
import { JobserviceService } from 'src/Services/jobservice.service';
import { JobjobseekerService } from 'src/Services/jobjobseeker.service';
import { IdserviceService } from 'src/Services/idservice.service';
import { JobseekernavigationComponent } from './Components/Jobseeker/jobseekernavigation/jobseekernavigation.component';
import { JobseekerdashboardComponent } from './Components/Jobseeker/jobseekerdashboard/jobseekerdashboard.component';
import { JobseekerappliedjobComponent } from './Components/Jobseeker/jobseekerappliedjob/jobseekerappliedjob.component';
import { JobseekerapplyjobComponent } from './Components/Jobseeker/jobseekerapplyjob/jobseekerapplyjob.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './Components/loader/loader.component';
import { ChatTemplateComponent } from './Components/chat-template/chat-template.component';
import { AdminnavigationComponent } from './Components/admin/adminnavigation/adminnavigation.component';
import { AdminopeningsComponent } from './Components/admin/adminopenings/adminopenings.component';
import { AdmincandidatesComponent } from './Components/admin/admincandidates/admincandidates.component';
import { AdmineditcandidatesComponent } from './Components/admin/admineditcandidates/admineditcandidates.component';
import { AdmineditopeningComponent } from './Components/admin/admineditopening/admineditopening.component';
import { PaymentReviewComponent } from './Components/Customer/payment-review/payment-review.component';
import { ViewpayslipComponent } from './Components/Jobseeker/viewpayslip/viewpayslip.component';
import { CarpenterhiringComponent } from './Components/home/carpenterhiring/carpenterhiring.component';
import { CustomerhomeComponent } from './Components/Customer/customernavigation/customerhome/customerhome.component';
import { AdminhomeComponent } from './Components/admin/adminnavigation/adminhome/adminhome.component';
import { JobseekerhomeComponent } from './Components/Jobseeker/jobseekernavigation/jobseekerhome/jobseekerhome.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    CustomernavigationComponent,
    CustomerdashboardComponent,
    CustomeraddjobComponent,
    CustomerviewappliedjobsComponent,
    CustomereditjobComponent,
    JobseekernavigationComponent,
    JobseekerdashboardComponent,
    JobseekerappliedjobComponent,
    JobseekerapplyjobComponent,
    LoaderComponent,
    ChatTemplateComponent,
    AdminnavigationComponent,
    AdminopeningsComponent,
    AdmincandidatesComponent,
    AdmineditcandidatesComponent,
    AdmineditopeningComponent,
    PaymentReviewComponent,
    ViewpayslipComponent,
    CarpenterhiringComponent,
    CustomerhomeComponent,
    AdminhomeComponent,
    JobseekerhomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService,NotificationService,AuthService,AuthGuard,JobserviceService,IdserviceService,JobjobseekerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
>>>>>>> f176ac5fdad4dfb41d8b6e31f46660dac3968e1a
