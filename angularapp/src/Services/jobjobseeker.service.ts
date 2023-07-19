import { Injectable } from '@angular/core';
import { Jobjobseekermodel } from 'src/Models/jobjobseekermodel.class';

@Injectable({
  providedIn: 'root'
})
export class JobjobseekerService {
  jobjobs:Jobjobseekermodel= new Jobjobseekermodel();
  constructor() { }
}