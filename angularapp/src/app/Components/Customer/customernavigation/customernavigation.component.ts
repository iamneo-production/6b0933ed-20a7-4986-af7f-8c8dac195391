import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-customernavigation',
  templateUrl: './customernavigation.component.html',
  styleUrls: ['./customernavigation.component.css']
})
export class CustomernavigationComponent implements OnInit {

  isLinkActive: boolean = false;
  constructor(private authservice:AuthService, private route:Router){
    
  }
  isActive(routePath: string): boolean {
    return this.route.isActive(routePath, true);
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
