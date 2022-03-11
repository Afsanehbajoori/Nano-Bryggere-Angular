import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
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
    localStorage.clear();
  this.restApi.getDatas(this.endpointB).subscribe((res) => {
  const user = res.find((a:any) => {
    console.log('infoLogin:' , a.kontaktoplysningerId);
    //this.restApi.getData(a.kontaktoplysningerId , this.endpointK).subscribe(data => {
      //console.log('infoLoginKontakt' , data);
      return a.brugernavn.toLowerCase() === this.loginDetails.brugernavn.toLowerCase() && a.pw === this.loginDetails.pw
   // })

  });
  if(user){
     /* console.log("kontaktoplysningerId:",user.kontaktoplysningerId);
     console.log("brugerId:",user.id)
     console.log("rolleId:",user.rolleId); */
     localStorage.setItem('kontaktoplysningerId' ,JSON.stringify(user.kontaktoplysningerId) );
     localStorage.setItem('brugerId' ,JSON.stringify(user.id) );
     localStorage.setItem('rolleId' ,JSON.stringify(user.rolleId) );
     this.loginDetails.brugerId = user.id;
     this.restApi.createData(this.loginDetails , this.endpoints).subscribe((res) => {
      // console.log("brugerId:" ,res.brugerId);

    })
    this.router.navigate(['../main/profil'] );

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
