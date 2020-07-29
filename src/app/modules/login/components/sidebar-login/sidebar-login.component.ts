import { Component, OnInit } from '@angular/core';

declare const $: any;
interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/login',
    title: 'Zaloguj się',
    icon: 'dashboard',
    class: ''
  }
];

@Component({
  selector: 'app-sidebar-login',
  templateUrl: './sidebar-login.component.html',
  styleUrls: ['./sidebar-login.component.scss']
})
export class SidebarLoginComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  isMobileMenu(): boolean {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
