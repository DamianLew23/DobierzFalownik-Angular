import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarUserComponent } from '../modules/user/components/sidebar-user/sidebar-user.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { SidebarAdminComponent } from '../modules/admin/components/sidebar-admin/sidebar-admin.component';



@NgModule({
  declarations: [FooterComponent, NavbarComponent, SidebarUserComponent, SidebarAdminComponent],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarUserComponent,
        SidebarAdminComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ]
})
export class CoreModule { }
