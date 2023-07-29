import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paymentmodel } from 'src/Models/paymentmodel.class';
import { ApiService } from 'src/Services/api.service';
import { AuthService } from 'src/Services/auth.service';


@Component({
  selector: 'app-viewpayslip',
  templateUrl: './viewpayslip.component.html',
  styleUrls: ['./viewpayslip.component.css']
})
export class ViewpayslipComponent implements OnInit {

  @Input() Details: any;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>(); 
  paymentDetails:Paymentmodel;
  isLoading: boolean = true;

  constructor(private apiservice:ApiService,private authservice:AuthService) { }

  ngOnInit(): void {
    console.log(this.Details);
   this.apiservice.viewpayslip(this.Details.jobId,this.authservice.getUserId(),this.authservice.getUserRole()).subscribe(
  (response:any)=>{
    console.log(response);
    this.isLoading=false;
    this.paymentDetails=response;
  },
  (error:any)=>{
    this.isLoading=false;
    console.log(error);

  }
 );
  }
  closePaymentslip() {
    this.cancel.emit(); 
  }
}
