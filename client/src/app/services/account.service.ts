import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  currentUser$ = new ReplaySubject<User>(1);

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post(this.baseUrl + 'account/login', credentials).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser$.next(user);
        }
      })
    )
  }

  register(registerInfo: any) {
    return this.http.post(this.baseUrl + 'account/register', registerInfo).pipe(
      map((user: User) => {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser$.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUser$.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser$.next(null);
  }
  
}
