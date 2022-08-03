import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators'
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

declare const google:any;

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient, private router:Router) { }

  logout(){
    localStorage.removeItem('token');
    
    google.accounts.id.revoke('mario.torreslepe@gmail.com', ()=>{
      this.router.navigateByUrl('/login');
    })
  }

  validateToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any) =>{
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true), catchError(err => of(false))
    )
  }

  postUser (formData: RegisterForm){
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp:any) =>{
        localStorage.setItem('token', resp.token)
      })
    )
  }

  login(fromData:LoginForm){
    return this.http.post(`${base_url}/login`, fromData).pipe(
      tap((resp:any) =>{
        localStorage.setItem('token', resp.token)
      })
    )
  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      tap((resp:any) =>{
        localStorage.setItem('token', resp.token)
      })
    )
  }
}
