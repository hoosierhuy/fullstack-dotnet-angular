import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in successfully');
    }, error => console.log(error));
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    return !!token; // Shorthand true/false
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
