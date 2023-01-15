import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getUserInfo(auth_token: string | null) {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
    return this.http.get<any>(backendPathUser + 'users/me', {headers: headers})
  }

  getKcalGoal(auth_token: string | null, age: string | null, weight: string | null, height: string | null, activity_level: string | null, gender: string | null, goal: string | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.post<any>(backendPathFood + 'doctor', { age: age, weight: weight, height: height, activity_level: activity_level, gender: gender, goal: goal}, {headers: headers})
  }

  updateUserInfo(auth_token: string | null, age: string | null, weight: string | null, height: string | null, activity_level: string | null, gender: string | null, goal: string | null, kcalGoal: string | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.patch<any>(backendPathUser + 'users/me', { age: age, weight: weight, height: height, activity_level: activity_level, gender: gender, goal: goal, kcalGoal: kcalGoal}, {headers: headers})
  }

  addWeightEntry(auth_token: string | null, weight: string | null, user_id: string | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.post<any>(backendPathUser + 'weights/' + user_id, { weight: weight}, {headers: headers})
  }

  getWeightsForUser(auth_token: string | null, user_id: string | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get<any>(backendPathUser + 'weights/' + user_id, {headers: headers})
  }

  addFood(auth_token: string | null, name: string | null, description: string | null, kcal: string | null, category: string | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.post<any>(backendPathFood + 'food', {headers: headers})
  }

  getAllFoods(auth_token: string | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get<any>(backendPathFood + 'food', {headers: headers})
  }

  addFoodInDiary(auth_token: string | null, when: string | null, qty: string | null, food_id: string | null,) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.post<any>(backendPathUser + 'me/food/' + food_id, {when: when, qty: qty}, {headers: headers})
  }

  getAllFoodsFromDiaryOneDay(auth_token: string | null, date: string | null) {

    // let params = new HttpParams();
    // const encodedDateA = encodeURIComponent(date!);

    // params = params.append('dateA', encodedDateA);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.get<any>(backendPathUser + 'me/food??dateA=[$eq](' + date + ')', {headers: headers})
  }
  
}
