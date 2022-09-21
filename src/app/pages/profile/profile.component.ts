import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {

  public profileForm! : FormGroup;
  public user! : User;
  public imageUpload : File | null=null;
  public imgTemp: any = '';

  constructor(private fb:FormBuilder, private userService:UserService, private fileUploadService:FileUploadService) {
    this.user = userService.user;
   }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email:[this.user.email, [Validators.required, Validators.email]]
    })
  }

  changeImage(event:any){
    this.imageUpload = event.target.files[0];

    if(!this.imageUpload){
      return this.imgTemp = null
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(this.imageUpload);

    reader.onloadend = () =>{
      this.imgTemp = reader.result
    }
    return this.imgTemp
    
  }

  uploadImage(){
    this.fileUploadService.updateImg(this.imageUpload!, 'users', this.user.uid!).subscribe((resp:any)=>{
      this.user.img = resp.nameFile;
      Swal.fire({
        icon: 'success',
        title: 'Image Update',
        showConfirmButton: false,
        timer: 1500
      })
    }, (error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Upload Image Error',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  updateProfile(){
    // console.log('update', this.profileForm.value)
    this.userService.putUser(this.profileForm.value).subscribe(resp=>{
      console.log(resp)
      const {name, email} = this.profileForm.value;
      this.user.name = name;
      this.user.email = email
      Swal.fire({
        icon: 'success',
        title: 'User Update',
        showConfirmButton: false,
        timer: 1500
      })
    }, (err) =>{
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Email already use',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

}
