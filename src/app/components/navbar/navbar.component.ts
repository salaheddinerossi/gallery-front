import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser: any;

  constructor(private authService:AuthService) {
  }

  ngOnInit() {
    const storedItem = localStorage.getItem('currentUser');
    this.currentUser = storedItem ? JSON.parse(storedItem) : null;
  }

  onLogout() {
    this.authService.logout();
  }

}
