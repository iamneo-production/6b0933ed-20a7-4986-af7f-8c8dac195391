import { Injectable } from '@angular/core';
import { Jobmodel } from 'src/Models/jobmodel.class';

@Injectable({
  providedIn: 'root'
})
export class JobserviceService {
  job:Jobmodel=new Jobmodel();
  constructor() { }
}
