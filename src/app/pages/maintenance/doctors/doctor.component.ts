import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

import {Doctor} from 'src/app/models/doctor.model';
import {Hospital} from 'src/app/models/hospital.model';

import {DoctorService} from 'src/app/services/doctor.service';
import {HospitalService} from 'src/app/services/hospital.service';
import {delay} from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital?: Hospital;
  public selectedDoctor?: Doctor;

  constructor( private fb:FormBuilder, 
              private hospitalService:HospitalService,
              private doctorService:DoctorService,
              private router: Router,
              private activatedRoute: ActivatedRoute
             ) { }

  ngOnInit(): void {
 
    //trae los parametros de la url(en este caso el id)
    this.activatedRoute.params.subscribe(({id})=>{
      this.loadOneDoctor(id)
    })



    this.loadHospitals();

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })


    this.doctorForm.get('hospital')?.valueChanges.subscribe(resp=>{
      this.selectedHospital = this.hospitals.find(hospital => hospital._id === resp)
    })

  }

  saveDoctor(){

    if(this.selectedDoctor){
      //update
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id
      }

      this.doctorService.putDoctor(data).subscribe(resp=>{
        Swal.fire('Updated', `${this.doctorForm.value.name} updated correctly`, 'success')
      })
    
    }else{
      //create
      this.doctorService.postDoctor(this.doctorForm.value).subscribe((resp:any)=>{
        Swal.fire('Created', `${this.doctorForm.value.name} created correctly`, 'success')
        this.router.navigateByUrl(`/dashboard/doctor/${resp._id}`)
      })
    }

  }


  loadHospitals(){
    this.hospitalService.getHospitals().subscribe(resp=>{
      this.hospitals = resp;
    })
  }

  loadOneDoctor(id:string){

    if( id ==="new" ){
      return;
    }

    this.doctorService.getOneDoctor(id).pipe(delay(100)).subscribe(doctor=>{

      const {name, hospital} = doctor;
      this.selectedDoctor = doctor;
      this.doctorForm.setValue({name, hospital:hospital?._id})
    }, 
    err=>{ 
      return this.router.navigateByUrl(`/dashboard/doctors`)
    });
  }

}
