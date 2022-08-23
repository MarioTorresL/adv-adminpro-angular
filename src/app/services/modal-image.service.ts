import { EventEmitter, Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;
  public types! : 'users' | 'doctors' | 'hospitals';
  public id!: string;
  public img!: string;

  public newImage : EventEmitter<string> = new EventEmitter<string>();

  get hideModal(){
    return this._hideModal;
  }

  openModal(types:'users' | 'doctors' | 'hospitals', id:string, img:string = 'no-image' ){
    this._hideModal = false;

    this.id = id;
    this.types = types;

    if(img?.includes('htps')){
     this.img = img; 
    }else{
      this.img = `${base_url}/upload/${types}/${img}`
    }
    
  }

  closeModal(){
    this._hideModal = true;
  }

  constructor() { }
}
