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

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}users`);
  }

  getUser(id): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}users/${id}`);
  }
}
