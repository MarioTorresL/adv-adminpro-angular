import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

//maintenances components
import { UsersComponent } from './maintenance/users/users.component';
import {HospitalsComponent} from './maintenance/hospitals/hospitals.component';
import {DoctorsComponent} from './maintenance/doctors/doctors.component';
import {DoctorComponent} from './maintenance/doctors/doctor.component';


const routes: Routes = [
  { 
    path: 'dashboard',  //path = /dashboard/progress or dashboard/grafica1. etc
    component: PagesComponent,
    canActivate:[AuthGuard],
    children:[
      { path: '', component: DashboardComponent, data:{ title:'Dashboard' } },
      { path: 'grafica1', component: Grafica1Component, data:{ title:'Graphics' }},
      { path: 'progress', component: ProgressComponent, data:{ title:'Progress' }},
      { path: 'account-settings', component:AccountSettingsComponent, data:{ title:' Account Settings' } },
      { path: 'promises', component: PromisesComponent, data:{ title:' Promises' } },
      { path: 'profile', component: ProfileComponent, data:{title:'User Profile'}},
      { path: 'rxjs', component: RxjsComponent, data:{ title:'RxJs' } },

      //Maintenance
      { path: 'users', component: UsersComponent, data:{ title:'Users' } },
      {path: 'hospitals', component: HospitalsComponent, data:{ title:'Hospitals' } },
      { path:'doctors', component:DoctorsComponent, data:{ title:'Doctors' } },
      { path:'doctor/:id', component:DoctorComponent, data:{ title:'Doctors' } }
      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },

  //PATH EXAMPLE
  // {path: 'path:/routeParam', component: MyComponent },
  // {path: 'staticPath', components:...},
  // {path: '**', component: ...}
  // {path: 'oldPath', redirectTo: '/staticpath'},
  // {path: ..., component: ..., data: {message:'Custom'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {}
