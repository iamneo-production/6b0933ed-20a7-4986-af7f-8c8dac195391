import { DecimalPipe } from "@angular/common";

export class Paymentmodel{
    paymentId: number;
    jobId: number;
    jobSeekerId: number;
    jobSeekerName: string;
    mobileNumber: string;
    jobDescription:string;
    jobLocation: string;
    fromDate: Date;
    toDate: Date;
    wagePerDay:string;
    workingDays: number;
    grossSalary: DecimalPipe;
    deductions: DecimalPipe;
    allowances: DecimalPipe;
    netSalary: DecimalPipe;
    paymentStatus: string;
}
