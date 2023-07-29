import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-jobseekernavigation',
  templateUrl: './jobseekernavigation.component.html',
  styleUrls: ['./jobseekernavigation.component.css']
})
export class JobseekernavigationComponent implements OnInit {
  isLinkActive: boolean = false;
  constructor(private authservice:AuthService,private router:Router){

  }
  ngOnInit(): void {
  }
  isActive(routePath: string): boolean {
    return this.router.isActive(routePath, true);
  }
  
  linkHovered() {
    
    this.isLinkActive = false;
  }
  
  linkClicked() {
    this.isLinkActive = true;
  }
  logout() {
    this.authservice.logout();
  }

}
