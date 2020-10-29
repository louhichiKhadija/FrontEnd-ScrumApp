import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/scrum/user-details', title: 'Profile',  icon:'person', class: '' },
    { path: '/scrum/home', title: 'Projects',  icon: 'home', class: '' },
    //{ path: '/scrum/dashbord', title: 'Dashbord',  icon:'dashboard', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  opened: boolean = true;
  
  constructor(private service: AuthService, private router:Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem); }

  logout(){
      this.service.logout()
      this.router.navigateByUrl('/')

    }




}
