import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { CustomernavigationComponent } from './Components/Customer/customernavigation/customernavigation.component';
import { CustomerdashboardComponent } from './Components/Customer/customerdashboard/customerdashboard.component';
import { CustomeraddjobComponent } from './Components/Customer/customeraddjob/customeraddjob.component';
import { CustomerviewappliedjobsComponent } from './Components/Customer/customerviewappliedjobs/customerviewappliedjobs.component';
import { CustomereditjobComponent } from './Components/Customer/customereditjob/customereditjob.component';
import { AuthGuard } from 'src/Services/authguard.service';
import { JobseekernavigationComponent } from './Components/Jobseeker/jobseekernavigation/jobseekernavigation.component';
import { JobseekerdashboardComponent } from './Components/Jobseeker/jobseekerdashboard/jobseekerdashboard.component';
import { JobseekerapplyjobComponent } from './Components/Jobseeker/jobseekerapplyjob/jobseekerapplyjob.component';
import { JobseekerappliedjobComponent } from './Components/Jobseeker/jobseekerappliedjob/jobseekerappliedjob.component';
import { JobseekereditjobComponent } from './Components/Jobseeker/jobseekereditjob/jobseekereditjob.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'user/signup', component: SignupComponent },
      { path: 'user/login', component: LoginComponent }
    ]
  },
  {
    path: 'customer',
    component: CustomernavigationComponent,
    // canActivate: [AuthGuard],
    data: { roles: ['customer'] }, // Specify the allowed roles for the route
    children: [
      { path: 'dashboard', component: CustomerdashboardComponent },
      { path: 'addJob', component: CustomeraddjobComponent },
      { path: 'viewAppliedCandidates', component: CustomerviewappliedjobsComponent },
      {path:'editJob',component:CustomereditjobComponent}
    ]
  },
  {
    path: 'jobseeker',
    component: JobseekernavigationComponent,
    // canActivate: [AuthGuard],
    data: { roles: ['jobseeker'] }, // Specify the allowed roles for the route
    children: [
      { path: 'dashboard', component: JobseekerdashboardComponent },
      { path: 'applyJob', component: JobseekerapplyjobComponent },
      { path: 'appliedJob', component: JobseekerappliedjobComponent },
      {path:'editjob',component:JobseekereditjobComponent}
    ]
  },
   // Add an unauthorized route for users with insufficient privileges
   { path: 'unauthorized', component: HomeComponent },
   // Add a wildcard route for handling undefined routes
   { path: 'login', redirectTo: '/user/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
