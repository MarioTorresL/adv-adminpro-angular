import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { DonutComponent } from './donut/donut.component';
import { LineComponent } from './line/line.component';



@NgModule({
  declarations: [
    IncrementerComponent,
    DonutComponent,
    LineComponent
  ],
  exports:[
    IncrementerComponent,
    DonutComponent,
    LineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
