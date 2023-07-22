import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paymentmodel } from 'src/Models/paymentmodel.class';
import { ApiService } from 'src/Services/api.service';

@Component({
  selector: 'app-payment-review',
  templateUrl: './payment-review.component.html',
  styleUrls: ['./payment-review.component.css']
})
export class PaymentReviewComponent implements OnInit {
  @Input() Details: any;
  paymentDetails:Paymentmodel;
  isLoading: boolean = true;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>(); 

  constructor(private apiservice:ApiService) { }

  ngOnInit(): void {
    console.log(this.Details)
    this.apiservice.reviewPayment(this.Details).subscribe(
      (response:Paymentmodel)=>{
        this.paymentDetails=response;
        this.isLoading = false;
          console.log(response);
      },
      (error:any)=>{
        console.log(error);
        this.isLoading = false;
        console.log("Error Occured");
      }
    );
  }
  makePayment() {
    this.apiservice.makePayment(this.paymentDetails).subscribe(
      (resonse:any)=>{
        console.log(resonse);
        this.cancel.emit();
      },
      (error:any)=>{
        console.log(error);
      }
    );
  }
 

  cancelPayment() {
    this.cancel.emit(); 
  }

}
