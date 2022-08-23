import { environment } from '../../environments/environment';

const API = environment.base_url;

export class User{
  constructor(
    public name: string,
    public email: string,
    public password?:string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?:string,
  ){}

  get imageUrl(){

    if(!this.img){
       return `${API}/upload/users/no-image`
    }

    if(this.img?.includes('https')){
      return this.img;
    }
    if(this.img){
      return `${API}/upload/users/${this.img}`
    }else{
      return `${API}/upload/users/no-image`
    }
  }
}
