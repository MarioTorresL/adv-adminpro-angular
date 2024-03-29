import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {environment} from 'src/environments/environment';

import {Doctor} from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{'x-token':this.token}
    }
  }

  getDoctors(){

    const url = `${base_url}/doctors`;
    
    return this.http.get<Doctor[]>(url, this.headers);
  }

  getOneDoctor(id:string){

    const url = `${base_url}/doctors/${id}`;
    
    return this.http.get<Doctor>(url, this.headers);
  }

  postDoctor(doctor:{name:string, hospital:string}){
    const url= `${base_url}/doctors`
    return this.http.post(url,doctor, this.headers);
  }

  putDoctor(doctor:Doctor){
    const url= `${base_url}/doctors/${doctor._id}`;
    return this.http.put(url, doctor, this.headers)
  }

  deleteDoctor(_id:string){
    const url= `${base_url}/doctors/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
