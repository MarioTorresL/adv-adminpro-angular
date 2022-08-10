import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  constructor(private http:HttpClient) { }
  
  get token():string{
  return localStorage.getItem('token') || '';
  }

  updateImg (file:File, type:'users' | 'doctors' | 'hospitals', id:string){
    
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    return this.http.put(`${base_url}/upload/${type}/${id}`, formData, {headers:{'x-token': this.token}});
  }
}
