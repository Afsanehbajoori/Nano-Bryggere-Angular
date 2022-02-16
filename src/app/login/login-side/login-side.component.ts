import { Kontaktolysninger } from 'src/app/Models/Kontaktoplysninger';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bruger } from 'src/app/Models/Bruger';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';



@Component({
  selector: 'app-login-side',
  templateUrl: './login-side.component.html',
  styleUrls: ['./login-side.component.css']
})

export class LoginSideComponent implements OnInit {
  login : any = {};
  logins: Bruger[];
  endpoints = '/Logins';
  endpointK = '/Kontaktoplysninger';
  endpointB= '/Brugere';
  id = this.actRoute.snapshot.params['id'];
  loginForm :any = new FormGroup({}) ;


  @Input() loginDetails = {brugernavn: '' , pw:'' , brugerId:null  };


  constructor(
    public router: Router,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
     ) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      brugerId:new FormControl(''),
      brugernavn: new FormControl('', Validators.required),
      pw: new FormControl('', [Validators.required, Validators.minLength(3)])

    }
    );
  }

  onSubmitLogin () {

this.restApi.getDatas(this.endpointB).subscribe((res) => {
   console.log(res);
  const user = res.find((a:any) => {
    return a.brugernavn === this.loginDetails.brugernavn && a.pw === this.loginDetails.pw
  });
  if(user){
     console.log(user.kontaktoplysningerId);
    this.loginDetails.brugerId= user.id;
    this.restApi.createData(this.loginDetails , this.endpoints).subscribe((res) => {
      console.log(res);
    })
    //alert('login success');
    this.router.navigate(['../main/main']);
  }
  else{
    alert('user ikke findes')
  }
})

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
