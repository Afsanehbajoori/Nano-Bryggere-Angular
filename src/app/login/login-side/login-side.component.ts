import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bruger } from 'src/app/Models/Bruger';
import { Rolle } from 'src/app/Models/Rolle';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-login-side',
  templateUrl: './login-side.component.html',
  styleUrls: ['./login-side.component.css']
})

export class LoginSideComponent implements OnInit {
  login : any = {};
  endpoints = '/Brugere';
  loginForm : FormGroup;

  constructor(
    public router: Router,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    //public auth: AuthService
    ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      brugernavn: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }
  
  onSubmitLogin () {
    // this.auth.user$.subscribe(
    //   (profile) => (this.profileJson = JSON.stringify(profile, null,2))
    // )
    this.restApi.getDatas(this.endpoints).subscribe((logins) => {
      this.login = logins.find((l:Bruger) => {
        console.log(this.login)

        //return l.brugernavn == this.loginForm.value.brugernavn && l.pw == this.loginForm.value.password
      });
      if(this.login){
        alert("Login Succes");
        this.loginForm.reset();
       // this.router.navigate(['../main/main']);
      }
      else{
        alert("Ingen Match");
      }
    });
  };

  onSubmitRegistre () {
    this.router.navigate(['../login/registrer']);
  };
}
