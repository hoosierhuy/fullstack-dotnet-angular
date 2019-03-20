import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { MessageModel } from '../_models/message.model';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<MessageModel[]> {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private router: Router,
    private alertifyService: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MessageModel[]> {
    return this.userService
      .getMessage(
        this.authService.decodedToken.nameid,
        this.pageNumber,
        this.pageSize,
        this.messageContainer
      )
      .pipe(
        catchError(error => {
          this.alertifyService.error('Problem retrieving messages.');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
