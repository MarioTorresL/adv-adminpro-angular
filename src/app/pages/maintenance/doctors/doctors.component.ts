import { Component, OnDestroy, OnInit } from '@angular/core';
import {delay, Subscription} from 'rxjs';
import {Doctor} from 'src/app/models/doctor.model';
import {DoctorService} from 'src/app/services/doctor.service';
import {ModalImageService} from 'src/app/services/modal-image.service';
import {SearchService} from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public doctors:Doctor[] = [];
  public loading: boolean = true;
  public imgSub!: Subscription;

  constructor( 
              private doctorService:DoctorService, 
              private modalService:ModalImageService,
              private searchService:SearchService
             ) { }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe()
  }

  ngOnInit(): void {
    this.loadingDoctors();
    
    this.imgSub = this.modalService.newImage.pipe(delay(100)).subscribe(resp=>{
      this.loadingDoctors()
    })

  }

  loadingDoctors(){
    this.loading = true;

    this.doctorService.getDoctors().subscribe(resp=>{
      this.doctors = resp;
      this.loading = false;
    });

  }

  deleteDoctor(doctor: Doctor){

    return Swal.fire({
      title: `Are you sure to delete ${doctor.name}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
    
        if (result.isConfirmed) {
          
          this.doctorService.deleteDoctor(doctor._id).subscribe(resp=>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success')
            this.loadingDoctors()
          });
        
        }
      })
  }


  search(value:string){

    if(value.length === 0){
      return this.loadingDoctors();
    }
    
    this.searchService.search('doctors',value).subscribe(resp=>{
      this.doctors = resp as Doctor[] 
    })
  }
  
  openModal(doctor:Doctor){
    this.modalService.openModal('doctors', doctor._id!, doctor.img )
  }

}
