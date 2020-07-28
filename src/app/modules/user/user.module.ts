import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvertersByPowerComponent } from './pages/inverters-by-power/inverters-by-power.component';
import { InvertersByCurrentComponent } from './pages/inverters-by-current/inverters-by-current.component';
import { UserRoutingModule } from './user-routing.module';
import { SupplyVoltageFilterComponent } from './components/supply-voltage-filter/supply-voltage-filter.component';
import { OutputVoltageFilterComponent } from './components/output-voltage-filter/output-voltage-filter.component';
import { PowerFilterComponent } from './components/power-filter/power-filter.component';
import { CurrentFilterComponent } from './components/current-filter/current-filter.component';
import { ProducerSeriesFilterComponent } from './components/producer-series-filter/producer-series-filter.component';
import { MatButtonModule } from '@angular/material/button';
import { InverterDisplayComponent } from './components/inverter-display/inverter-display.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [
        InvertersByPowerComponent,
        InvertersByCurrentComponent,
        SupplyVoltageFilterComponent,
        OutputVoltageFilterComponent,
        PowerFilterComponent,
        CurrentFilterComponent,
        ProducerSeriesFilterComponent,
        InverterDisplayComponent
    ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class UserModule { }
