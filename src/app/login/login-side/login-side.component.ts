import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  login: any = {};
  logins: Bruger[];
  endpointL = '/Logins';
  endpointI = '/ContactInformation';
  endpointU = '/Users';

  loginForm: any = new FormGroup({});

  @Input() loginDetails = { username: '', pw: '', userId: null };

  constructor(
    public router: Router,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userId: new FormControl(''),
      username: new FormControl('', Validators.required),
      pw: new FormControl('', [Validators.required, Validators.minLength(3)])
    }
    );
  }

  onSubmitLogin() {
    localStorage.clear();

  this.restApi.getDatas(this.endpointU).subscribe((res) => {
  const user = res.find((a:any) => {
    // console.log('infoLogin:' , a.contactInformation);
    //this.restApi.getData(a.kontaktoplysningerId , this.endpointK).subscribe(data => {
      //console.log('infoLoginKontakt' , data);
      return a.username.toLowerCase() === this.loginDetails.username.toLowerCase() && a.pw === this.loginDetails.pw
   // })

  });
  if(user){
     /* console.log("kontaktoplysningerId:",user.kontaktoplysningerId);
     console.log("brugerId:",user.id)
     console.log("rolleId:",user.rolleId); */
     localStorage.setItem('contactInformationId' ,JSON.stringify(user.contactInformationId) );
     localStorage.setItem('userId' ,JSON.stringify(user.id) );
     localStorage.setItem('roleId' ,JSON.stringify(user.roleId) );
     this.loginDetails.userId = user.id;
     this.restApi.createData(this.loginDetails , this.endpointL).subscribe((res) => {
      // console.log("brugerId:" ,res.brugerId);
        })
        this.router.navigate(['../main/profile']);
      }
      else {
        alert('user ikke findes')
      }
    })
  };

  onSubmitRegistre() {
    this.router.navigate(['../login/registration']);
  };

  // onloadLogin() {
  //   return this.restApi.getData(this.login.id, this.endpointL).subscribe((logins) => {
  //     this.login = logins;
  //   })
  // }
}