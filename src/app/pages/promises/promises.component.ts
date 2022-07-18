import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsers().then( user =>{
    })
    // ===========PROMISES============
    // const promise = new Promise( (resolve, reject) => {
    //   if(false){
    //     resolve('Soy la promesa');
    //   }else{
    //     reject('Algo salio mal! :(');
    //   }
      
    // });

    // promise.then( (value)=> {
    //   console.log('mensaje', value)
    // }).catch(error=>{
    //   console.log('Error!', error)
    // })

    // console.log('Soy un console log random')

  }
  
  getUsers(){

    return new Promise( resolve =>{
      fetch('https://reqres.in/api/users')
      .then( res=> res.json())
      .then( body=> resolve(body.data))
    });


  }


}
