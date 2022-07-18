import { Component, OnDestroy} from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  intervalSubs: Subscription;

  constructor() { 
    // this.returnObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   value => console.log('Subs:', value),
    //   err => console.warn('Error', err),
    //   () => console.info('Observable Finish!')
    // );

   this.intervalSubs = this.returnInterval().subscribe(console.log)

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }


  returnInterval(): Observable<number> {
    return interval(500).pipe(
                              map(value => value+1),
                              filter( value => (value % 2 == 0 )), //si es false, termina el pipe y no llega al take
                              // take(10),
                            );
  }


  returnObservable(): Observable<number>{
    let i = -1;

    const obs$ = new Observable<number>( observer =>{

      const intervalo = setInterval( () =>{

        i++;
        observer.next(i);

        if(i===4){
          clearInterval(intervalo);
          observer.complete();
        }

        if(i ===2){
          observer.error('I get to 2')
        }

      }, 1000)

    });

    return obs$;
  }

  

}
