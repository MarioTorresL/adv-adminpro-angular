import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  title: string = '';
  titleSub$: Subscription;

  constructor(private router: Router ) {

    this.titleSub$ = this.getRoutingArguments().subscribe(({title}) =>{
      this.title = title;
      document.title = title
    });

  }
  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }

  getRoutingArguments(){
    return this.router.events.pipe( 
      filter( (event: any)=> event instanceof ActivationEnd),
      filter( (event: ActivationEnd)=> event.snapshot.firstChild == null),
      map( (event: ActivationEnd)=> event.snapshot.data) 
      )
  }

}
