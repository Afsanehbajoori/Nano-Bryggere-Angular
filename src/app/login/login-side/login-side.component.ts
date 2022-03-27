import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bruger } from 'src/app/Models/Bruger';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { LoginService } from 'src/app/shared/login.service'
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
  expirationDate: any;
  endpoints = '/Logins';
  endpointK = '/Kontaktoplysninger';
  endpointB = '/Brugere';
  hide = true;
  loginForm: FormGroup = new FormGroup({});

  @Input() loginDetails = { brugernavn: '', pw: '', brugerId: null };

  constructor(
    public router: Router,
    public loginService: LoginService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      brugernavn: new FormControl('', Validators.required),
      pw: new FormControl('', [Validators.required, Validators.minLength(3)])
    }
    );
  }
  onSubmitLogin(){
    if(this.loginForm.invalid){
      return;
    }

    this.loginService.login(this.loginForm.get('brugernavn')?.value, this.loginForm.get('pw')?.value)

        this.router.navigate(['../main/profil'])
    }

  onSubmitRegistre() {
    this.router.navigate(['../login/registrer']);
  };

}