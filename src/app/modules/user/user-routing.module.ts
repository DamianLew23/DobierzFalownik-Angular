import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvertersByPowerComponent} from './pages/inverters-by-power/inverters-by-power.component';
import {InvertersByCurrentComponent} from './pages/inverters-by-current/inverters-by-current.component';

const userRoutes: Routes = [
  {
    path: '',
    redirectTo: '/wg-mocy',
    pathMatch: 'full',
  },
  {
    path: 'wg-mocy',
    component: InvertersByPowerComponent,
    data: {
      title: 'Program Doboru Falowników wg Mocy Silnika',
      h1: 'Program Doboru Falowników wg Mocy Silnika',
    },
  },
  {
    path: 'wg-pradu',
    component: InvertersByCurrentComponent,
    data: {
      title: 'Program Doboru Falowników wg Prądu Silnika',
      h1: 'Program Doboru Falowników wg Prądu Silnika',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
