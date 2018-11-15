import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserModel } from '../_models/user.model';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class MemberDetailResolver implements Resolve<UserModel> {
    constructor(
        private userService: UserService,
        private router: Router,
        private alertifyService: AlertifyService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
        return this.userService.getUser(route.params['id'])
            .pipe(
                catchError(error => {
                    this.alertifyService.error('Problem retrieving data.');
                    this.router.navigate(['/members']);
                    return of(null);
                })
            );
    }
}