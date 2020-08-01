import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvertersComponent } from './pages/inverters/inverters.component';
import { AddInverterComponent } from './components/add-inverter/add-inverter.component';
import { CopyInverterComponent } from './components/copy-inverter/copy-inverter.component';
import { EditInverterComponent } from './components/edit-inverter/edit-inverter.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CoreModule} from '../../../../core/core.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [InvertersComponent, AddInverterComponent, CopyInverterComponent, EditInverterComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class InvertersModule { }
