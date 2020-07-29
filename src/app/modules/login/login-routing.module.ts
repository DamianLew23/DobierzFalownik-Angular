import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Zaloguj Się',
      h1: 'Zaloguj Się',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
