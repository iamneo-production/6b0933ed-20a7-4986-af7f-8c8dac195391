import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/Services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notifications: string[] = [];
  constructor(public notificationService: NotificationService) {}

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
