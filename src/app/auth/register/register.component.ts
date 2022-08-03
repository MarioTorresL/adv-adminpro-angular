import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmit = false;
  
  public registerForm = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)] ],
    email:['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: [false, Validators.required]
  }, {
    validator: this.samePasswords('password', 'password2')
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router:Router) { }
  
  createUser(){
    this.formSubmit = true;

    if(this.registerForm.invalid){
      return;
    }

    // post to backnd
    this.userService.postUser(this.registerForm.value).subscribe( resp =>{
      this.router.navigateByUrl('/')
    }, (err) => {
      console.log(err)
      Swal.fire({
      title: 'Error!',
      text: err.error,
      icon: 'error',
      })
    }
    );
  }

  notValid(field:string ):boolean {

    if(this.registerForm.get(field)?.invalid && this.formSubmit){
      
      return true;
    }else{
      return false
    }
  }

  passwordNotMatch(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if((pass1 !== pass2)&& this.formSubmit){
      return true
    }else{
      return false
    }
    
  }

  aceptTerms(){
    return !this.registerForm.get('terms')?.value && this.formSubmit
  }

  samePasswords(pass1Name:string, pass2Name:string){
    // necesita retornar una funcion para el validador
    return(formGroup:FormGroup)=>{

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({notSame:true})
      }

    } 

  }

}
