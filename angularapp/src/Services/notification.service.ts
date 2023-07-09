import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  public notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string): void {
    this.notificationSubject.next(message);
  }

  showError(message: string): void {
    this.notificationSubject.next(message);
  }
  showLogin(msg: string):void {
    this.notificationSubject.next(msg);
  }
  showLoginError(msg: string):void {
    this.notificationSubject.next(msg);
  }
}
