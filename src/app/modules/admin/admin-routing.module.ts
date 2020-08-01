import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/pages/dashboard/dashboard.component';
import {ProducersComponent} from './pages/producers/pages/producers.component';
import {InvertersComponent} from './pages/inverters/pages/inverters/inverters.component';

const adminRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Panel Zarządzania Systemem Doboru Falowników',
      h1: 'Panel Zarządzania Systemem Doboru Falowników',
    }
  },
  {
    path: 'inverters',
    component: InvertersComponent,
    data: {
      title: 'Falowniki - Panel Zarządzania',
      h1: 'Falowniki - Panel Zarządzania',
    }
  },
  {
    path: 'producers',
    component: ProducersComponent,
    data: {
      title: 'Producenci - Panel Zarządzania',
      h1: 'Producenci - Panel Zarządzania',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
