import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signupmodel } from 'src/Models/signupmodel.class';
import { Loginmodel } from 'src/Models/loginmodel.class';
import { Observable } from 'rxjs';
import { Jobmodel } from 'src/Models/jobmodel.class';
import { Jobseekermodel } from 'src/Models/jobseekermodel.class';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private readonly apiUrl:string = 'https://8080-fbcdbbefcafbefccadccfbaecebaebffdaedcbb.project.examly.io';
  
  constructor(private http: HttpClient) {}
  Signup(user: Signupmodel): Observable<Signupmodel> {
    const url=`${this.apiUrl}/user/signup`;
    return this.http.post<Signupmodel>(url, user);
  }
  Login(user:Loginmodel): Observable<Loginmodel>{
    const url=`${this.apiUrl}/user/login`;
    return this.http.post<Loginmodel>(url,user);
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
  getProfiles(userId: number, userRole: string):Observable<Jobseekermodel[]>{
    const url=`${this.apiUrl}/admin/Appliedprofiles?userRole=${userRole}&UserId=${userId}`;
    return this.http.get<Jobseekermodel[]>(url);
}
applyJob(id:number,jobseeker:Jobseekermodel,userId: number, userRole: string):Observable<Jobseekermodel>{
  const url=`${this.apiUrl}/jobseeker/applyJob${id}?userRole=${userRole}&UserId=${userId}`;
  return this.http.post<Jobseekermodel>(url,jobseeker);
}
appliedJob(userId: number, userRole: string):Observable<Jobmodel[]>{
  const url=`${this.apiUrl}/jobseeker/getAppliedJobs?userRole=${userRole}&UserId=${userId}`;
  return this.http.get<Jobmodel[]>(url);
}
getProfile(userId: number, userRole: string):Observable<Jobseekermodel>{
  const url=`${this.apiUrl}/jobseeker/getProfile?userRole=${userRole}&UserId=${userId}`;
  return this.http.get<Jobseekermodel>(url);
}
// CheckAlreadyApplied(id:number,userId: number, userRole: string):Observable<any> {
//     const url=`${this.apiUrl}/jobseeker/checkAlreadyApplied${id}?userRole=${userRole}&UserId=${userId}`;
//     return this.http.get<any>(url);
  
// }
}