import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {CoreModule} from '../../core/core.module';
import {ProducersModule} from './pages/producers/producers.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {DashboardModule} from './pages/dashboard/dashboard.module';
import {ConfirmationDialogService} from '../../core/services/confirmation-dialog.service';
import {InvertersModule} from './pages/inverters/inverters.module';



@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    ProducersModule,
    InvertersModule,
    DashboardModule
  ],
  providers: [
    ConfirmationDialogService
  ],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class AdminModule { }
