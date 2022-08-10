import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn')
  googleBtn!: ElementRef;

  public formSubmit = false;
  
  public loginForm: FormGroup= this.fb.group({
    email:[localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });


  constructor(private router:Router, private fb:FormBuilder, private userService: UserService) { }


  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){

    google.accounts.id.initialize({
      client_id: "497704976525-gsv3q8las6i839n7spotqpsp9eqj47mq.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response :any){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.userService.loginGoogle(response.credential).subscribe( resp =>{
      this.router.navigateByUrl('/')
    })
  }

  login(){

    this.userService.login(this.loginForm.value).subscribe(resp =>{
      
      if(this.loginForm.get('remember')?.value){
        localStorage.setItem('email', this.loginForm.get('email')?.value)
      }else{
        localStorage.removeItem('email')
      }
      this.router.navigateByUrl('/')
    },(err)=>{

      Swal.fire({
        title: 'Error!',
        text: err.error,
        icon: 'error',
        })
    })
  }

}
