import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';
import { IdserviceService } from 'src/Services/idservice.service';
import { Jobseekermodel } from 'src/Models/jobseekermodel.class';

@Component({
  selector: 'app-customerviewappliedjobs',
  templateUrl: './customerviewappliedjobs.component.html',
  styleUrls: ['./customerviewappliedjobs.component.css']
})
export class CustomerviewappliedjobsComponent implements OnInit {
  form: FormGroup;
  jobseekers: Jobseekermodel[] = [];
  selectedCandidate: Jobseekermodel | null = null;
  showChat: boolean = false;
  messages: any[] = [];
  newMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiservice: ApiService,
    private idservice: IdserviceService,
    private authservice: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.disableBackButton();
    this.getProfiles();
  }

  getProfiles() {
    this.apiservice.getProfiles(this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
      (response: Jobseekermodel[]) => {
        this.jobseekers = response;
        console.log(this.jobseekers);
      },
      (error: any) => {
        console.log(error.error);
      }
    );
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

  openChat(candidate: Jobseekermodel) {
    this.showChat = true;
    this.selectedCandidate = candidate;
  }

  closeChat() {
    this.showChat = false;
    this.selectedCandidate = null;
  
  }}

