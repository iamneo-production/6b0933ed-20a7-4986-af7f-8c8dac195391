import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NotificationService } from 'src/Services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notifications: string[] = [];
  constructor(public notificationService: NotificationService,private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe(message => {
      this.notifications.push(message);
      setTimeout(() => {
        this.closeNotification(message);
      }, 3000);
    });

  }
  closeNotification(notification: string): void {
    this.notifications = this.notifications.filter(n => n !== notification);
  }
}
