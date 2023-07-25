<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
=======
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
import { AdminnavigationComponent } from './Components/admin/adminnavigation/adminnavigation.component';
import { AdmincandidatesComponent } from './Components/admin/admincandidates/admincandidates.component';
import { AdminopeningsComponent } from './Components/admin/adminopenings/adminopenings.component';
import { AdmineditcandidatesComponent } from './Components/admin/admineditcandidates/admineditcandidates.component';
import { AdmineditopeningComponent } from './Components/admin/admineditopening/admineditopening.component';
import { CarpenterhiringComponent } from './Components/home/carpenterhiring/carpenterhiring.component';
import { CustomerhomeComponent } from './Components/Customer/customernavigation/customerhome/customerhome.component';
import { JobseekerhomeComponent } from './Components/Jobseeker/jobseekernavigation/jobseekerhome/jobseekerhome.component';
import { AdminhomeComponent } from './Components/admin/adminnavigation/adminhome/adminhome.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path:'',component:CarpenterhiringComponent},
      { path: 'user/signup', component: SignupComponent },
      { path: 'user/login', component: LoginComponent }
    ]
  },
  {
    path: 'customer',
    component: CustomernavigationComponent,
    canActivate: [AuthGuard],
    data: { roles: ['customer'] }, 
    children: [
      {path:'',component:CustomerhomeComponent},
      { path: 'dashboard', component: CustomerdashboardComponent },
      { path: 'addJob', component: CustomeraddjobComponent },
      { path: 'viewAppliedCandidates', component: CustomerviewappliedjobsComponent },
      {path:'editJob/:id',component:CustomereditjobComponent}
    ]
  },
  {
    path: 'jobseeker',
    component: JobseekernavigationComponent,
    canActivate: [AuthGuard],
    data: { roles: ['jobseeker'] },
    children: [
      {path:'',component:JobseekerhomeComponent},
      { path: 'dashboard', component: JobseekerdashboardComponent },
      { path: 'applyJob', component: JobseekerapplyjobComponent },
      { path: 'appliedJob', component: JobseekerappliedjobComponent }
      
    ]
  },
  {
    path: 'admin',
    component: AdminnavigationComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }, 
    children: [
      {path:'',component:AdminhomeComponent},
      { path: 'getAllJobs', component: AdminopeningsComponent },
      { path: 'profile', component: AdmincandidatesComponent },
      { path: 'editProfile/:id', component: AdmineditcandidatesComponent },
      { path: 'editJob/:id', component: AdmineditopeningComponent }
    ]
  },
  
   { path: 'unauthorized', component: HomeComponent },

   { path: 'login', redirectTo: '/user/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
>>>>>>> f176ac5fdad4dfb41d8b6e31f46660dac3968e1a
