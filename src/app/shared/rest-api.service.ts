import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Login } from '../Models/Login';
import { from, Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators'
import { Øl } from '../Models/Øl';
import { Rolle } from '../Models/Rolle';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  stringifying: any = [];
  apiUrl = 'https://localhost:7142/api';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  //api forbindelse. disse kald er 
  getLogin(): Observable<Login> {
    return this.http.get<Login>(this.apiUrl + '/Logins')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getLogins(id: number): Observable<Login> {
    return this.http.get<Login>(this.apiUrl + '/Logins/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  createLogins(id: number): Observable<Login> {
    return this.http.post<Login>(this.apiUrl + '/Logins', JSON.stringify(Login), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  updateLogin(id:number, login: Login): Observable<Login>{
    return this.http.put<Login>(this.apiUrl + '/logins/' + id, JSON.stringify(this.stringifying), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  deleteLogin(id: number){
    return this.http.delete<Login>(this.apiUrl + '/Logins/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //Dynamisk api forbindelse. metoden bliver kaldt indefra den valgte ts.
  //Inde i constructoren bliver endpointet kaldt via den valgte url navn.
  //Det samme gælder id (som udvælger denne specifikke data via dens id) og data til at sige hvilken tabel, der er snakke om.
  getDatas(endpoint: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + endpoint)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getData(id: number, endpoint: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + endpoint + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  createData(id: number, endpoint: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + endpoint, JSON.stringify(this.stringifying), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  updateData(id:number, endpoint: string, data: any): Observable<any>{
    return this.http.put<any>(this.apiUrl + endpoint + id, JSON.stringify(this.stringifying), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  deleteData(id: number, endpoint: string){
    return this.http.delete<any>(this.apiUrl + endpoint + id, this.httpOptions)
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
