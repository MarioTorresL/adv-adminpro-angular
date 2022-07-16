import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
  { 
    path: 'dashboard',  //path = /dashboard/progress or dashboard/grafica1. etc
    component: PagesComponent,
    children:[
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: 'account-settings', component:AccountSettingsComponent }
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