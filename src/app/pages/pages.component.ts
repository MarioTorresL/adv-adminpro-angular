import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions():any; //llamar a funciones globales sin que ts tire advertencia (debe estar la funcion previamente seteada)

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingsService:SettingsService) { }
  
  ngOnInit(): void {
    customInitFunctions();
  }

}
