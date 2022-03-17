import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable()

  constructor(private apiservice: RestApiService) {
    const token = localStorage.getItem('bearer')
    this._isLoggedIn$.next(!!token)
   }

  login(username: string, pw: string){
    return this.apiservice.createData({"bruger":{"brugernavn": username, "pw": pw}},'/logins/').pipe(
      tap((response: any) =>{
        localStorage.setItem('bearer', response.bearer)
        console.log('log of response', response)
      })
    )
  }
}
