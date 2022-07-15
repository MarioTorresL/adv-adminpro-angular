import { Component} from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  title1='Ventas Regionales';
  labels1: string[] = ['Santiago', 'Concepcion', 'Puerto Montt'];
  data1: number[] = [3500, 5000, 1000];

  
  title3='Ventas a Empresas';
  labels3: string[] = ['Fallabella', 'Tottus', 'Jumbo'];
  data3: number[] = [5000, 1000, 250000];
  
  title4='Trabajadores Por Area';
  labels4: string[] = ['Ventas', 'Logistica', 'Produccion'];
  data4: number[] = [50, 10, 100];
  
  title2= 'Ventas Por Producto';
  datasets = [
    {
      data: [ 1000, 900, 800, 810, 560, 550, 400 ],
      label: 'Alcohol Gel',
      backgroundColor: 'rgba(0,153,221,0.5)',
      borderColor: 'rgba(0,153,221,1)',
      pointBackgroundColor: 'rgba(0,153,221,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,153,221,0.8)',
      fill: 'origin',
    },
    {
      data: [ 2800, 1800, 2000, 1900, 860, 900, 700 ],
      label: 'Limonadas',
      backgroundColor: 'rgba(255, 153, 51,0.2)',
      borderColor: 'rgba(255, 153, 51,1)',
      pointBackgroundColor: 'rgba(255, 153, 51,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 153, 51,1)',
      fill: 'origin',
    },
    {
      data: [ 1800, 1300, 1000, 1500, 1000, 980, 500 ],
      label: 'Like',
      backgroundColor: 'rgba(132, 176, 38,0.3)',
      borderColor: 'rgba(132, 176, 38,1)',
      pointBackgroundColor: 'rgba(132, 176, 38,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(132, 176, 38,0.8)',
      fill: 'origin',
    }
  ]
}
