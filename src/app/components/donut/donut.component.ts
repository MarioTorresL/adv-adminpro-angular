import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ChartData, ChartEvent } from 'chart.js';


@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnChanges{
  @Input() title:string = '';
  @Input() data: number[]= [10,10,10]; 
  @Input('labels') doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{data: this.data}]
  };

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.doughnutChartData={
      labels: this.doughnutChartLabels,
      datasets: [{data: this.data}]
    }
  }

  
}
