import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import { SidebarLoginComponent } from './components/sidebar-login/sidebar-login.component';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [SidebarLoginComponent, LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule
  ]
})
export class LoginModule { }
