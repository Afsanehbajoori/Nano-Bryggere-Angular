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
  login: any = {};
  listTest: any;
  // bruger: Bruger[];
  endpointL = '/Logins';
  endpointK = '/KontaktOplysninger';
  endpointB = '/Bruger';

  loginForm: any = new FormGroup({});

  @Input() loginDetaljer = { brugernavn: '', loginTime: '', brugerId: null };
  @Input() loginer = { pw: '' };
  // @Input() 

  constructor(
    public router: Router,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      brugerId: new FormControl(''),
      brugernavn: new FormControl('', Validators.required),
      pw: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    localStorage.clear();
  }

  onSubmitLogin() {
    this.restApi.getDatas(this.endpointB).subscribe((res) => {
      const user = res.find((a: any) => {
        //this.restApi.getData(a.kontaktoplysningerId , this.endpointK).subscribe(data => {
        return a.brugernavn.toLowerCase() === this.loginDetaljer.brugernavn.toLowerCase() && a.pw === this.loginer.pw
        // })
      });
      if (user) {
        this.restApi.getDatas(this.endpointL).subscribe((res) => {
          this.login = res;
          for (let l = 0; l < res.length; l++) {
            const listDrop = { brugerId: res[l].brugerId, id: res[l].id, loginTime: res[l].loginTime }
            if (listDrop.brugerId == user.id) {
              this.listTest = listDrop;
            }
          }
          // console.log(this.listTest);
          if (this.listTest) {
            this.listTest.loginTime = new Date().toDateString();
            // console.log(this.loginDetaljer.loginTime);
            localStorage.setItem('kontaktOplysningerId', JSON.stringify(user.kontaktOplysningerId));
            localStorage.setItem('brugerId', JSON.stringify(user.id));
            localStorage.setItem('rolleId', JSON.stringify(user.rolleId));
            console.log(this.listTest);
            this.restApi.updateData(this.listTest.id, this.endpointL, this.listTest).subscribe((res) => {
            })
            this.router.navigate(['../main/profil']);
          }
          else
          {
            this.loginDetaljer.loginTime = new Date().toDateString();
            this.loginDetaljer.brugerId = user.id;
            localStorage.setItem('kontaktOplysningerId', JSON.stringify(user.kontaktOplysningerId));
            localStorage.setItem('brugerId', JSON.stringify(user.id));
            localStorage.setItem('rolleId', JSON.stringify(user.rolleId));
            console.log(this.loginDetaljer);
            this.restApi.createData(this.loginDetaljer, this.endpointL).subscribe((res) => {
            })
            this.router.navigate(['../main/profil']);
          }
      })
    }
      else {
        alert('user ikke findes');
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