import { Component, OnInit } from '@angular/core';

import {FileUploadService} from 'src/app/services/file-upload.service';
import {ModalImageService} from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  public imageUpload : File | null=null;
  public imgTemp: any = '';

  constructor( public modalService:ModalImageService, public fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.imgTemp = null;
    this.modalService.closeModal();
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

    const id = this.modalService.id;
    const types = this.modalService.types;

    this.fileUploadService.updateImg(this.imageUpload!,types! , id).subscribe((resp:any)=>{
      Swal.fire({
        icon: 'success',
        title: 'Image Update',
        showConfirmButton: false,
        timer: 1500
      })
      this.modalService.newImage.emit(resp)
      this.closeModal()
    }, (error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Upload Image Error',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
