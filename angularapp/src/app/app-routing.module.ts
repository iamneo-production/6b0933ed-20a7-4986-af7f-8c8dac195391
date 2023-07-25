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
import { AuthGuard } from 'src/Services/authguard.service';
import { CustomerdashboardComponent } from './Components/Customer/customerdashboard/customerdashboard.component';
import { CustomeraddjobComponent } from './Components/Customer/customeraddjob/customeraddjob.component';
import { CustomerviewappliedjobsComponent } from './Components/Customer/customerviewappliedjobs/customerviewappliedjobs.component';
import { CustomereditjobComponent } from './Components/Customer/customereditjob/customereditjob.component';

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
    data: { roles: ['customer'] }, 
    children: [
      { path: 'dashboard', component: CustomerdashboardComponent },
      { path: 'addJob', component: CustomeraddjobComponent },
      { path: 'viewAppliedCandidates', component: CustomerviewappliedjobsComponent },
      {path:'editJob/:id',component:CustomereditjobComponent}
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
