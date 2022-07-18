import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]=[
    {
      title:'| Dashboard |',
      icon: 'mdi mdi-gauge',
      submenu:[
        { title: 'Main', url:'/'},
        { title: 'ProgressBar', url:'progress'},
        { title: 'Promises', url:'promises'},
        { title: 'Graphics', url:'grafica1'},
        { title: 'Rxjs', url:'rxjs'}
      ]
    }
  ];

  constructor() { }
}
