import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Theme} from "../../models/Theme";
import {Observable} from "rxjs";
import {Image} from "../../models/Image";

@Injectable({
  providedIn: 'root'
})


export class ThemeService {





  constructor(private http:HttpClient) {

  }
  private getAuthHeaders(): HttpHeaders {

    const value:string = localStorage.getItem('currentUser') as string;
    const currentUser  = JSON.parse(value);
    const token = currentUser ? currentUser.token : '';
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  }



  private baseURL = 'http://localhost:3000/themes/';


  // Create a new theme
  createTheme(theme: Theme) {
    return this.http.post(`${this.baseURL}create`, theme,{headers:this.getAuthHeaders()});
  }

  getThemesByUserId(userId: string): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.baseURL}`,{ headers: this.getAuthHeaders() });
  }



}
