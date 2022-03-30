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
  endpointI = '/KontaktOplysninger';
  endpointU = '/Bruger';

  loginForm: any = new FormGroup({});

  @Input() loginDetaljer = { brugernavn: '', pw: '', brugerId: null };

  constructor(
    public router: Router,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      brugerId: new FormControl(''),
      brugernavn: new FormControl('', Validators.required),
      pw: new FormControl('', [Validators.required, Validators.minLength(3)])
    }
    );
  }

  onSubmitLogin() {
    localStorage.clear();

  this.restApi.getDatas(this.endpointU).subscribe((res) => {
    console.log(res);
  const user = res.find((a:any) => {
    // console.log('infoLogin:' , a.contactInformation);
    //this.restApi.getData(a.kontaktoplysningerId , this.endpointK).subscribe(data => {
      //console.log('infoLoginKontakt' , data);
      return a.brugernavn.toLowerCase() === this.loginDetaljer.brugernavn.toLowerCase() && a.pw === this.loginDetaljer.pw
   // })

  });
  console.log(user);
  if(user){
     /* console.log("kontaktoplysningerId:",user.kontaktoplysningerId);
     console.log("brugerId:",user.id)
     console.log("rolleId:",user.rolleId); */
     localStorage.setItem('kontaktOplysningerId' ,JSON.stringify(user.kontaktOplysningerId) );
     localStorage.setItem('brugerId' ,JSON.stringify(user.id) );
     localStorage.setItem('rolleId' ,JSON.stringify(user.rolleId) );
     this.loginDetaljer.brugerId = user.id;
     this.restApi.createData(this.loginDetaljer , this.endpointL).subscribe((res) => {
     console.log("brugerId:", res.brugerId);
     console.log("brugerId:", res);
        })
        this.router.navigate(['../main/profil']);
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