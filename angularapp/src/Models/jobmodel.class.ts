import { Jobjobseekermodel } from "./jobjobseekermodel.class";

export class Jobmodel {
    jobId!: number;
    jobDescription!: string;
    jobLocation!: string;
    fromDate!: Date;
    toDate!: Date;
    wagePerDay!: string;
    mobileNumber!: string;
    userId!: number;
    user: any; 
    jobJobSeekers!: Jobjobseekermodel[];
  }