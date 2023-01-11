import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { backendPathUser, backendPathFood } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<any>(backendPathUser + 'users/login', { mail: email, password: password });
  }

  register(email: string, password: string, name: string) {
    return this.http.post<any>(backendPathUser + 'users', { mail: email, password: password, name: name });
  }

  logout(auth_token: string | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    this.http.post<any>(backendPathUser + 'users/logout/all', {headers: headers}).subscribe(() => { });
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_mail');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_token');
    this.router.navigateByUrl('login');
  }

    // getLoggedInUser(auth_token): Observable<any> {
  //   const headers = new Headers({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${auth_token}`
  //   })
  //   return this.http.get(apiUrl, { headers: headers })
  // }

  listInfoAboutMe(auth_token: string | null) {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
    return this.http.get<any>(backendPathUser + 'users/me', {headers: headers})
  }
}
