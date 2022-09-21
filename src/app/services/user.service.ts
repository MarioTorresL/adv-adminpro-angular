import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators'
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { LoadUser } from '../interfaces/load-users.interface';

import { User } from '../models/user.model';


declare const google:any | undefined;

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  constructor( private http: HttpClient, private router:Router,) { }

  get token ():string{
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.user.uid || '';
  }

  get headers(){
    return{
      headers:{
        'x-token':this.token
      }
    }  
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.user.role!
  }

  saveLocalStorage(token:string, menu:any){
    localStorage.setItem('token', token)
    localStorage.setItem('menu', JSON.stringify(menu))
  }

  logout(){
    google.accounts.id.revoke('mario.torreslepe@gmail.com', ()=>{
      this.router.navigateByUrl('/login');
    })
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
  }

  validateToken(): Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, this.headers,
    ).pipe(
      map((resp:any) =>{
        const { email, google, name, role, uid, img=''} = resp.user;
        
        this.user = new User(name, email, '', img, google, role, uid)!;
        this.saveLocalStorage(resp.token, resp.menu)
        return true;
      }), catchError(error => of(false))
    )
  }

  postUser (formData: RegisterForm){
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp:any) =>{
        this.saveLocalStorage(resp.token, resp.menu)
      })
    )
  }

  putUser(data:{emial:string, name:string, role:string}){
    data = {
      ...data,
      role: this.user.role!
    }
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers)
  }

  login(fromData:LoginForm){
    return this.http.post(`${base_url}/login`, fromData).pipe(
      tap((resp:any) =>{
        this.saveLocalStorage(resp.token, resp.menu)
      })
    )
  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      tap((resp:any) =>{
        this.saveLocalStorage(resp.token, resp.menu)
      })
    )
  }

  loadUsers(desde:number = 0){
    
    const url = `${base_url}/users?desde=${desde}`;
    return this.http.get< LoadUser >(url, this.headers).pipe(
      map(resp=>{

        const users = resp.users.map(
          us=> new User(us.name, us.email, '', us.img, us.google, us.role, us.uid)
        )

        return {
          total: resp.total,
          users
        };
      })
    )
  }

  deleteUser(uid?:string){
    return this.http.delete(`${base_url}/users/${uid}`, this.headers)

  }

  saveUser(data:User){
    return this.http.put(`${base_url}/users/${data.uid}`, data, this.headers)
  }


}
