import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserModel } from '../_models/user.model';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<UserModel> {
    constructor(
        private userService: UserService,
        private router: Router,
        private alertifyService: AlertifyService,
        private authService: AuthService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
        return this.userService.getUser$(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertifyService.error('Problem retrieving your data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
