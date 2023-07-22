import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Signupmodel } from 'src/Models/signupmodel.class';
import { Loginmodel } from 'src/Models/loginmodel.class';
import { Observable } from 'rxjs';
import { Jobmodel } from 'src/Models/jobmodel.class';
import { Jobseekermodel } from 'src/Models/jobseekermodel.class';
import { map } from 'rxjs/operators'
import { Chatmessage } from 'src/Models/chatmessage.class';
import { Jobjobseekermodel } from 'src/Models/jobjobseekermodel.class';
import { Paymentmodel } from 'src/Models/paymentmodel.class';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private readonly apiUrl:string = 'https://8080-fecaaccaffbefccadccfbaecebaebffdaedcbb.project.examly.io';
  
  constructor(private http: HttpClient) {}
  userSignup(user: Signupmodel): Observable<Signupmodel> {
    const url=`${this.apiUrl}/user/signup`;
    return this.http.post<Signupmodel>(url, user);
  }
  adminSignup(admin: Signupmodel): Observable<Signupmodel> {
    const url=`${this.apiUrl}/admin/signup`;
    return this.http.post<Signupmodel>(url, admin);
  }
  userLogin(user:Loginmodel): Observable<Loginmodel>{
    const url=`${this.apiUrl}/user/login`;
    return this.http.post<Loginmodel>(url,user);
  }
  adminLogin(admin:Loginmodel): Observable<Loginmodel>{
    const url=`${this.apiUrl}/admin/login`;
    return this.http.post<Loginmodel>(url,admin);
  }
  AddJob(job:Jobmodel, userId: number,userRole: string):Observable<Jobmodel>{
    const url=`${this.apiUrl}/admin/addJob?userRole=${userRole}&UserId=${userId}`;
    return this.http.post<Jobmodel>(url,job)
  }
  getJobs(userId: number, userRole: string): Observable<any[]> {
    const url = `${this.apiUrl}/user/dashboard?userRole=${userRole}&UserId=${userId}`;
    return this.http.get<any[]>(url).pipe(
      map((response: any) => response.value)
    );
  }
  EditJob(id:number,jobdata: Jobmodel,userId: number,userRole: string):Observable<any> {
      const url=`${this.apiUrl}/admin/editJob${id}?userRole=${userRole}&UserId=${userId}`;
      return this.http.put<any>(url,jobdata);
  }
  deleteJob(id: number, userId: number, userRole: string): Observable<any> {
    const url = `${this.apiUrl}/admin/deleteJob${id}?userRole=${userRole}&UserId=${userId}`;
    return this.http.delete<any>(url);
  }
  getProfiles(userId: number, userRole: string):Observable<Jobjobseekermodel[]>{
    const url=`${this.apiUrl}/admin/Appliedprofiles?userRole=${userRole}&UserId=${userId}`;
    return this.http.get<Jobjobseekermodel[]>(url);
}
applyJob(id:number,jobseeker:Jobseekermodel,userId: number, userRole: string):Observable<Jobseekermodel>{
  const url=`${this.apiUrl}/jobseeker/applyJob${id}?userRole=${userRole}&UserId=${userId}`;
  return this.http.post<Jobseekermodel>(url,jobseeker);
}
appliedJob(userId: number, userRole: string):Observable<Jobjobseekermodel[]>{
  const url=`${this.apiUrl}/jobseeker/getAppliedJobs?userRole=${userRole}&UserId=${userId}`;
  return this.http.get<Jobjobseekermodel[]>(url);
}
getProfile(userId: number, userRole: string):Observable<Jobseekermodel>{
  const url=`${this.apiUrl}/jobseeker/getProfile?userRole=${userRole}&UserId=${userId}`;
  return this.http.get<Jobseekermodel>(url);
}
GetChat(jobid:number,id:string,userId: number, userRole: string):Observable<any>{
  const url=`${this.apiUrl}/user/getchat/${id}/${jobid}?userRole=${userRole}&UserId=${userId}`;
  return this.http.get<any>(url);
}
SendMessage(message:Chatmessage):Observable<any>{
  const url=`${this.apiUrl}/user/sendMessage`;
  return this.http.post<any>(url,message);
}
CheckStatus(userId: number, userRole: string):Observable<Jobjobseekermodel[]>{
  const url=`${this.apiUrl}/jobseeker/checkstatus?userRole=${userRole}&UserId=${userId}`;
  return this.http.get<Jobjobseekermodel[]>(url);
}
ChangeStatus(jobjobs:Jobjobseekermodel,userId:number,userRole:string):Observable<Jobjobseekermodel>{
  const url=`${this.apiUrl}/jobseeker/changestatus?userRole=${userRole}&UserId=${userId}`;
  return this.http.post<Jobjobseekermodel>(url,jobjobs);
}
admingetJobs(userId:number,userRole:string):Observable<Jobmodel[]>{
  const url=`${this.apiUrl}/admin/getAlljobs?userRole=${userRole}&UserId=${userId}`;
  return this.http.get<Jobmodel[]>(url);
}
editProfile(id: number,seeker:Jobseekermodel, userId:number,userRole:string):Observable<any>{
  const url=`${this.apiUrl}/admin/editProfile${id}?userRole=${userRole}&UserId=${userId}`;
  return this.http.put<any>(url,seeker);
}
deleteProfile(id: number, userId:number,userRole:string):Observable<any>{
  const url=`${this.apiUrl}/admin/deleteProfile${id}?userRole=${userRole}&UserId=${userId}`;
  return this.http.delete<any>(url);
}
reviewPayment(jobjobs:Jobjobseekermodel):Observable<Paymentmodel>{
  const url=`${this.apiUrl}/admin/reviewpayment`;
  return this.http.post<Paymentmodel>(url,jobjobs);
}
makePayment(pay:Paymentmodel):Observable<any>{
  const url=`${this.apiUrl}/admin/makepayment`;
  return this.http.post<any>(url,pay);
}
viewpayslip(id:number,userId:number,userRole:string):Observable<Paymentmodel>{
  const url=`${this.apiUrl}/admin/viewpayslip${id}?userRole=${userRole}&UserId=${userId}`;
  return this.http.get<Paymentmodel>(url);
}
}