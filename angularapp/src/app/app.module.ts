//import { BrowserModule } from '@angular/platform-browser';
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
import { AuthGuard } from 'src/Services/authguard.service';
import { JobserviceService } from 'src/Services/jobservice.service';
import { IdserviceService } from 'src/Services/idservice.service';
import { JobjobseekerService } from 'src/Services/jobjobseeker.service';
import { CustomeraddjobComponent } from './Components/Customer/customeraddjob/customeraddjob.component';
import { CustomerdashboardComponent } from './Components/Customer/customerdashboard/customerdashboard.component';
import { CustomereditjobComponent } from './Components/Customer/customereditjob/customereditjob.component';
import { CustomernavigationComponent } from './Components/Customer/customernavigation/customernavigation.component';
import { CustomerviewappliedjobsComponent } from './Components/Customer/customerviewappliedjobs/customerviewappliedjobs.component';
import { AdmincandidatesComponent } from './Components/admin/admincandidates/admincandidates.component';
import { AdmineditcandidatesComponent } from './Components/admin/admineditcandidates/admineditcandidates.component';
import { AdmineditopeningComponent } from './Components/admin/admineditopening/admineditopening.component';
import { AdminnavigationComponent } from './Components/admin/adminnavigation/adminnavigation.component';
import { AdminopeningsComponent } from './Components/admin/adminopenings/adminopenings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  
  ],
  providers: [ApiService,NotificationService,AuthService,AuthGuard,JobserviceService,IdserviceService,JobjobseekerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
