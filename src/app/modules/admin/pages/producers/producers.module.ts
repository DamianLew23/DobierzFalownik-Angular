import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProducersComponent} from './pages/producers.component';
import { AddProducerComponent } from './components/add-producer/add-producer.component';
import { EditProducerComponent } from './components/edit-producer/edit-producer.component';
import { AddSeriesComponent } from './components/add-series/add-series.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CoreModule} from '../../../../core/core.module';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [ProducersComponent, AddProducerComponent, EditProducerComponent, AddSeriesComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    CoreModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ProducersModule { }
