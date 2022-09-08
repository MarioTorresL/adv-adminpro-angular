import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import {HospitalService} from 'src/app/services/hospital.service';

import {Hospital} from 'src/app/models/hospital.model';
import {ModalImageService} from 'src/app/services/modal-image.service';
import {delay, Subscription} from 'rxjs';
import {SearchService} from 'src/app/services/search.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public imgSub!: Subscription;
  
  constructor( private hospitalService:HospitalService, 
              private modalService: ModalImageService,
              private searchService: SearchService
             ) { }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe()
  }

  ngOnInit(): void {
  
    this.loadingHospitals();
    this.imgSub = this.modalService.newImage.pipe(delay(100)).subscribe( img=> this.loadingHospitals() )

  }


  loadingHospitals(){

    this.loading = true;

    this.hospitalService.getHospitals().subscribe(resp=>{
     this.hospitals = resp; 
     this.loading = false;
    });
  }
  
  saveChanges(hospital:Hospital){
    this.hospitalService.putHospitals(hospital.name, hospital._id).subscribe(resp=>{
      Swal.fire('Updated!', hospital.name, 'success')
    })
  }

  deleteHospital(hospital:Hospital){
    this.hospitalService.deleteHospitals(hospital._id).subscribe(resp=>{
      this.loadingHospitals();
      Swal.fire('Deleted', hospital.name, 'success')
    })
  }

  async openSweetModal(){

    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      title: 'Create a new Hospital',
      text:'Enter name of new Hospital',
      inputPlaceholder: 'Name of new hospital',
      showCancelButton: true,
    })

    if( value!.trim().length > 0 ){
      this.hospitalService.postHospitals(value!).subscribe((resp:any)=>{
        this.hospitals.push(resp.hospial)
        Swal.fire('Created', value, 'success')
      })
    }
  }

  openModal(hospital:Hospital){

    this.modalService.openModal('hospitals', hospital._id, hospital.img)

  }

  search(value:string){
    if(value.length == 0){
      return this.loadingHospitals();
    }

    return this.searchService.search('hospitals', value).subscribe(resp=>{
      this.hospitals = resp as Hospital[] ;
    }) 
  }





}
