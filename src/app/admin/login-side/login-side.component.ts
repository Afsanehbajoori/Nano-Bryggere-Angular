import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bruger } from 'src/app/Models/Bruger';
import { Login } from 'src/app/Models/Login';
import { RestApiService } from 'src/app/shared/rest-api.service';


@Component({
  selector: 'app-login-side',
  templateUrl: './login-side.component.html',
  styleUrls: ['./login-side.component.css']
})
export class LoginSideComponent implements OnInit {
  login:Login[];
  endpointL='/Logins';
  endpointB = '/Bruger';
  clickButton:boolean=true;
  id = this.actRoute.snapshot.params['id'];
  loginList:any;
  brugere: any;
 //  searchkeyBrugernavn:string;

  constructor( public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.onHentLogin();
  }

  onHentLogin(){
    return this.restApi.getDatas(this.endpointL).subscribe(data => {
      this.login=data;
      console.log('login:' ,this.login);
    }
    )
  }

  onVisLogin(id:any){
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointL).subscribe(data => {
      this.loginList= data;
      this.restApi.getData(this.loginList.brugerId , this.endpointB).subscribe((res) => {
        this.brugere = res;
        console.log('bruger:' ,this.brugere.brugernavn);
      })
  })

  }




}
