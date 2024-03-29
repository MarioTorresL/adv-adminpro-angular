import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {Hospital} from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor(private http:HttpClient) { }
  
  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers (){
    return {
      headers:{'x-token':this.token}
    }
  }



  getHospitals(){
    
    const url = `${base_url}/hospitals`;
    return this.http.get<Hospital[]>(url, this.headers);
  }

  postHospitals(name:string){
    const url = `${base_url}/hospitals`;
    return this.http.post(url, { name }, this.headers)
  }

  putHospitals(name:string, _id:string){
    const url = `${base_url}/hospitals/${_id}`
    return this.http.put(url, { name }, this.headers)
  }

  deleteHospitals(_id:string){
    const url = `${base_url}/hospitals/${_id}`;
    return this.http.delete(url, this.headers)
  }

}
