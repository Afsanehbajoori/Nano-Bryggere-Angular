import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bruger } from 'src/app/Models/Bruger';
import { Rolle } from 'src/app/Models/Rolle';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Login } from 'src/app/Models/Login';

@Component({
  selector: 'app-login-side',
  templateUrl: './login-side.component.html',
  styleUrls: ['./login-side.component.css']
})
export class LoginSideComponent implements OnInit {
  logins: Bruger
  roller: Rolle
  loginForm : FormGroup;
  @Input() loginDetails = {Brugernavn: ''}
  constructor(
    public router: Router,
    public restApi: RestApiService
    ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    }
    );
  }
  addLogin(datalogin: Login){
    this.restApi.createLogins(this.loginDetails).subscribe((data: {}) => {
      this.router.navigate(['../main/main'])
    })
  }
}
