import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserModel } from 'src/app/_models/user.model';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;

  user: UserModel;
  // Prevent the user from inadvertently closing the browser before saving changes
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => this.user = data['user']);
  }

  updateUser() {
    // "nameid" represents the id of the user
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(next => {
        this.alertifyService.success('Profile updated succesfully.');
        this.editForm.reset(this.user);
      }, error => this.alertifyService.error(error));
  }

}
