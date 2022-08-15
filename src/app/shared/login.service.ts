import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Rolle } from '../Models/Rolle';
import { RestApiService } from './rest-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Clearance } from '../Models/Clearance';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { DocTypeToken } from '@angular/compiler/src/ml_parser/tokens';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  private readonly TOKEN_NAME = 'bearer'
  private _clearance$ = new Clearance()
  isLoggedIn$ = this._isLoggedIn$
  clearance$ = this._clearance$
  endpointB = '/Brugere';

  get token(): any{
    return localStorage.getItem(this.TOKEN_NAME)
  } 
  get rolle(): any{
    return localStorage.getItem('rolle')
  }
  get level(): any{
    return localStorage.getItem('level')
  }
  constructor(private apiservice: RestApiService, private jwtHelper: JwtHelperService) {
    this._isLoggedIn$.next(!!this.token)
    this._clearance$.role = this.rolle
    this._clearance$.level = this.level
   }

  login(username: string, pw: string){
    localStorage.clear()
    return this.apiservice.createData({ "brugernavn": username, "pw": pw },'/logins/').subscribe((response) =>{
      localStorage.setItem(this.TOKEN_NAME, response.bearer)
      var dt =this.getTokenDecoded(response.bearer);
      this._clearance$.id = dt.Id
      this._clearance$.name = dt.Name
      this._clearance$.role = dt.Role
      this._clearance$.level = dt.Level
        localStorage.setItem('brugerId' , this.clearance$.id.toString()) ;
        localStorage.setItem('rolle' , this.clearance$.role);
        localStorage.setItem('level' , this.clearance$.level);
        this._isLoggedIn$.next(true)
        console.log('log of response', response)
        console.log('this.bruger......................................', this.rolle)
      })
  }
  // private getUser(token: string): Rolle{
  //   return JSON.parse(atob(token.split('.')[1])) as Rolle;
  // }
  getTokenDecoded(token: any) {
    console.log("decoded token ------------------- : ",this.jwtHelper.decodeToken(token))
    return this.jwtHelper.decodeToken(token) ;
  }
}
