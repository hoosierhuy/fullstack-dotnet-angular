import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from '../_models/user.model';
import { PaginatedResult } from '../_models/pagination';
import { MessageModel } from '../_models/message.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers$(
    page?,
    itemsPerPage?,
    userParams?,
    likesParam?
  ): Observable<PaginatedResult<UserModel[]>> {
    const paginatedResult: PaginatedResult<UserModel[]> = new PaginatedResult<
      UserModel[]
    >();
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (likesParam === 'Likers') {
      params = params.append('likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('likees', 'true');
    }

    return this.http
      .get<UserModel[]>(`${this.baseUrl}users`, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
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

  setMainPhoto$(userId: number, id: number) {
    // Empty object in the post request is to satisfy the body requirement in post requests
    return this.http.post(
      `${this.baseUrl}users/${userId}/photos/${id}/setMain`,
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(`${this.baseUrl}users/${userId}/photos/${id}`);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(`${this.baseUrl}users/${id}/like/${recipientId}`, {});
  }

  getMessage(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<
      MessageModel[]
    > = new PaginatedResult<MessageModel[]>();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<MessageModel[]>(`${this.baseUrl}users/${id}/messages`, {
        observe: 'response',
        params
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }

          return paginatedResult;
        })
      );
  }

  getMessageThread(id: number, recipientId: number) {
    return this.http.get<MessageModel[]>(
      `${this.baseUrl}users/${id}/messages/thread/${recipientId}`
    );
  }

  sendMessage(id: number, message: MessageModel) {
    return this.http.post(`${this.baseUrl}users/${id}/messages`, message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(`${this.baseUrl}users/${userId}/messages/${id}`, {});
  }

  markAsRead(userId: number, messageId: number) {
    this.http
      .post(`${this.baseUrl}users/${userId}/messages/${messageId}/read`, {})
      .subscribe(() => {});
  }
}
