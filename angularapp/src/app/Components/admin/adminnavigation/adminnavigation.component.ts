import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-adminnavigation',
  templateUrl: './adminnavigation.component.html',
  styleUrls: ['./adminnavigation.component.css']
})
export class AdminnavigationComponent implements OnInit {
  isLinkActive: boolean = false;
  constructor(private authservice:AuthService,private router:Router){

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
  logout(){
    this.authservice.logout();
  }

  ngOnInit(): void {
  }

}
