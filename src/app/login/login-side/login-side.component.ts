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
  logins: Bruger
  roller: Rolle
  login: any = [];
  id = this.actRoute.snapshot.params['id'];
  loginForm : FormGroup;
  @Input() loginDetails = {Brugernavn: ''}


 

  constructor(
    public router: Router,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
    ) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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
  // addLogin(datalogin: Login){
  //   this.restApi.createLogins(this.loginDetails).subscribe((data: {}) => {
  //     this.router.navigate(['../main/main'])
  //   })
  // }
  // loadLogin(){
  //   return this.restApi.getLogin().subscribe((data: {}) => {
  //     this.login = data;
  //   })
  // }
  // deleteLogin(id : any){
  //   if(window.confirm('Are you sure, you want to delete?')){
  //     this.restApi.deleteLogin(id).subscribe(data => {
  //       this.loadLogin()
  //     })
  //   }  
  // }
  // updateLogin(){
  //   if(window.confirm('Are you sure, you want to update?')){
  //     this.restApi.updateLogin(this.id, this.login).subscribe(data => {
  //       this.router.navigate(['../main/main'])
  //     })
  //   }
  // }
}
