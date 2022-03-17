import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bruger } from 'src/app/Models/Bruger';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { LoginService } from 'src/app/shared/login.service'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-login-side',
  templateUrl: './login-side.component.html',
  styleUrls: ['./login-side.component.css']
})

export class LoginSideComponent implements OnInit {
  login: any = {};
  logins: Bruger[];
  expToken: any;
  tokenPayload: any;
  expirationDate: any;
  endpoints = '/Logins';
  endpointK = '/Kontaktoplysninger';
  endpointB = '/Brugere';

  loginForm: any = new FormGroup({});

  @Input() loginDetails = { brugernavn: '', pw: '', brugerId: null };

  constructor(
    public router: Router,
    public restApi: RestApiService,
    public loginService: LoginService,
    public actRoute: ActivatedRoute,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      brugernavn: new FormControl('', Validators.required),
      pw: new FormControl('', [Validators.required, Validators.minLength(3)])
    }
    );
  }
  onSubmitLogin(){
      localStorage.clear()
      this.loginService.login(this.loginForm.get('brugernavn')?.value, this.loginForm.get('pw')?.value)
      .subscribe((response) => {
        console.log('response on post',response)
        this.expToken = response.bearer;
        this.GetTokenDecoded()
        localStorage.setItem('brugerId' , this.tokenPayload.Id);
        localStorage.setItem('rolle' , this.tokenPayload.Role );
        console.log("localstorage brugerId", localStorage.getItem('brugerId'))
         
      })

      // this.loginService.loadLogin().subscribe((res)=>{
      //   this.login = res;
      //   this.logins.push(res)
      // })

     if (this.login) {
       this.router.navigate(['../main/profil'])
      }else{
        alert('Bruger findes ikke')
      }
    }


  onSubmitRegistre() {
    this.router.navigate(['../login/registrer']);
  };

 
  GetTokenDecoded() {
    console.log("decoded token",this.jwtHelper.decodeToken(this.expToken))
    this.tokenPayload = this.jwtHelper.decodeToken(this.expToken);
  }
}