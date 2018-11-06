import { AuthService } from './../_services/auth.service';
import { Component } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model: any = {};
  // Access identifier for authService set to public so it can be called in template
  constructor(
    public authService: AuthService, 
    private alertify: AlertifyService, 
    private router: Router) { }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => this.alertify.error(error),
      () => this.router.navigate(['/members'])
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
