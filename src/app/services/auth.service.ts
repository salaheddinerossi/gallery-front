import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl="http://localhost:3000/users/";
  private currentUserSubject:BehaviorSubject<any>;
  public currentUser: Observable<any>;



  constructor(private http:HttpClient,private router:Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  private getAuthHeaders(): HttpHeaders {

    const value:string = localStorage.getItem('currentUser') as string;
    const currentUser  = JSON.parse(value);
    const token = currentUser ? currentUser.token : '';
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }


  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}login`, { username, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
            return response;
          }
          return null;
        })
      )
  }

  register(username:string,password:string){
    return this.http.post(`${this.apiUrl}register`,{username:username,password:password},{headers:this.getAuthHeaders()})
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);


  }
  isAuthenticated(): boolean {
    return !!this.currentUserValue && !!this.currentUserValue.id;
  }



}
