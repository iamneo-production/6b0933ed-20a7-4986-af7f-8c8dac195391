import { Jobmodel } from "./jobmodel.class";
import { Jobseekermodel } from "./jobseekermodel.class";

export class Jobjobseekermodel{
    jobId: number;
    job: Jobmodel;
    jobSeekerId: number;
    jobSeeker: Jobseekermodel;
    status: string;
}