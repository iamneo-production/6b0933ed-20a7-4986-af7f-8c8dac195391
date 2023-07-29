import { DecimalPipe } from "@angular/common";

export class Jobseekermodel{
    jobSeekerId!:string;
    userRole!:string;
    email!:string;
    jobSeekerName!:string;
    address!:string;
    experience!:string;
    mobileNumber!:string;
    averageRating!:DecimalPipe;
    totalRatings!:number;

}