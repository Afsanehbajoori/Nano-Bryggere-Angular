import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bruger } from 'src/app/Models/Bruger';
import { Rolle } from 'src/app/Models/Rolle';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Login } from 'src/app/Models/Login';

@Component({
  selector: 'app-login-side',
  templateUrl: './login-side.component.html',
  styleUrls: ['./login-side.component.css']
})

export class LoginSideComponent implements OnInit {
  login : any = {};
  roller: Rolle;
  logins: Bruger[];
  endpoints = '/Logins';
  id = this.actRoute.snapshot.params['id'];
  loginForm : FormGroup;
  @Input() loginDetails = {Brugernavn: ''}

  constructor(
    public router: Router,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    }
    );
  }
  
  onSubmitLogin () {
    this.router.navigate(['../main/main']);
  };

  onSubmitRegistre () {
    this.router.navigate(['../login/registrer']);
  };

  loadLogin(){
    return this.restApi.getData(this.login.id, this.endpoints).subscribe((logins) => {
      this.login = logins;
    })
  }
}
