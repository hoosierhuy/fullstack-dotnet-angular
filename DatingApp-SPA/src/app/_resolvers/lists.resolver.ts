import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserModel } from '../_models/user.model';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class ListsResolver implements Resolve<UserModel[]> {
    pageNumber = 1;
    pageSize = 5;
    likesParam = 'Likers';

    constructor(
        private userService: UserService,
        private router: Router,
        private alertifyService: AlertifyService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<UserModel[]> {
        return this.userService.getUsers$(this.pageNumber, this.pageSize, null, this.likesParam)
            .pipe(
                catchError(error => {
                    this.alertifyService.error('Problem retrieving member list data.');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
    }
}
