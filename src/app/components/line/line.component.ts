import { Component, Input, SimpleChanges} from '@angular/core';

import { ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styles: [
  ]
})
export class LineComponent {
  @Input() title:string = '';
  @Input() datasets:any[] = [];

  public lineChartData: ChartConfiguration['data'] = {
    datasets: this.datasets,
    labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.3
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.lineChartData = {
      datasets: this.datasets,
      labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio' ]
    };
  }

}
