import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Login } from '../Models/Login';
import { from, Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiUrl = 'https://localhost:7142/api';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getLogin(): Observable<Login> {
    return this.http.get<Login>(this.apiUrl + '/Logins')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getLogins(id: any): Observable<Login> {
    return this.http.get<Login>(this.apiUrl + '/Logins/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  createLogins(id: any): Observable<Login> {
    return this.http.post<Login>(this.apiUrl + '/Logins', JSON.stringify(Login), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  updateLogin(id:any,login: Login): Observable<Login>{
    return this.http.put<Login>(this.apiUrl + '/Logins/' + id, JSON.stringify(login), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteLogin(id: any){
    return this.http.delete<Login>(this.apiUrl + '/Logins/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
