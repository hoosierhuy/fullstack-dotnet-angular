import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from '../_models/user.model';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers$(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<UserModel[]>> {
    const paginatedResult: PaginatedResult<UserModel[]> = new PaginatedResult<UserModel[]>();
    let params = new HttpParams();

    if ((page !== null) && (itemsPerPage !== null)) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.http.get<UserModel[]>(`${this.baseUrl}users`, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  getUser$(id): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}users/${id}`);
  }

  updateUser(id: number, user: UserModel) {
    return this.http.put(`${this.baseUrl}users/${id}`, user);
  }

  setMainPhoto$(userId: number,  id: number) {
    // Empty object in the post request is to satisfy the body requirement in post requests
    return this.http.post(`${this.baseUrl}users/${userId}/photos/${id}/setMain`, {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(`${this.baseUrl}users/${userId}/photos/${id}`);
  }
}
