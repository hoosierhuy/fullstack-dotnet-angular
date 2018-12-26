import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserModel } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers$(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}users`);
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
