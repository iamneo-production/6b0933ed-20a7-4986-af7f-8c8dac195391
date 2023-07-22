import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from 'src/Services/api.service';
import { Chatmessage } from 'src/Models/chatmessage.class';
import { AuthService } from 'src/Services/auth.service';
import { IdserviceService } from 'src/Services/idservice.service';

@Component({
  selector: 'app-chat-template',
  templateUrl: './chat-template.component.html',
  styleUrls: ['./chat-template.component.css']
})
export class ChatTemplateComponent implements OnInit, OnChanges {
  @Input() candidate: any;
  UserRole:any;
  currentuserId:any;
  @Output() close: EventEmitter<void> = new EventEmitter<void>(); 
  messages: Chatmessage[] = []; 
  @ViewChild('chatBody', { static: false }) chatBody: ElementRef;
  newMessage: string = '';
  recip: string = '';

  constructor(private apiService: ApiService, private authservice: AuthService,private idservice:IdserviceService) {
   
  }

  ngOnInit() {
    this.UserRole=this.authservice.getUserRole();
    this.getChat();
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.candidate && !changes.candidate.firstChange) {
      this.candidate = changes.candidate.currentValue;
      this.getChat();
      
    }
  }

  closeChat() {
    this.close.emit(); 
  }

  sendMessage() {
    if (this.authservice.getUserRole()=="Jobseeker"){
      this.currentuserId=this.candidate.job.userId.toString();
    }
    else{
      this.currentuserId=this.candidate.jobSeeker.jobSeekerId.toString();
    }
    if (this.newMessage.trim() !== '') {
      if (this.authservice.getUserRole() == 'User') {
        this.recip = 'Jobseeker';
      } else {
        this.recip = 'User';
      }
      const message: Chatmessage = {
        sender: this.authservice.getUserRole(),
        senderId: this.authservice.getUserId().toString(),
        recipientId: this.currentuserId,
        message: this.newMessage,
        timestamp: new Date(),
        id: '',
        jobId:this.idservice.JobId,
        recipient: this.recip
      };
      this.apiService.SendMessage(message).subscribe(
        (response) => {
          this.getChat();
    
          console.log(response);
        },
        (error) => {
          console.log(error.error);
        }
      );
      this.newMessage = '';
      
    }
  }

  getChat() {
    console.log(this.candidate);
    if (this.authservice.getUserRole()=="Jobseeker"){
      this.currentuserId=this.candidate.job.userId.toString();
    }
    else{
      this.currentuserId=this.candidate.jobSeeker.jobSeekerId.toString();
    }
    this.apiService
      .GetChat(
        this.idservice.JobId,
        this.currentuserId,
        this.authservice.getUserId(),
        this.authservice.getUserRole()
      )
      .subscribe(
        (response) => {
          this.messages = response;
          setTimeout(() => {
            this.scrollToBottom();
          }, 0);
        },
        (error) => {
          console.log(error.error);
        }
      );
     
  }

  scrollToBottom(): void {
    if (this.chatBody) {
      const element: HTMLElement = this.chatBody.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
 
  
  
  
}


