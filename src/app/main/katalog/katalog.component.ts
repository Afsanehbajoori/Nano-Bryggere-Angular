import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/Models/Login';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
  beertests: Øl[];
  beer = new Øl;
  logins: Login[];
  login = new Login;
  endpoints = '/Øller';
  //endpoints = '/Logins';


  constructor(
    public restApi: RestApiService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOl()
  }
  loadOl(){
    return this.restApi.getDatas(this.endpoints).subscribe((beer) => {
      this.beertests = beer;
      console.log(this.beertests);
    })
  }
  // loadLogin(){
  //   return this.restApi.getDatas(this.beer.Id,this.endpoints).subscribe((login) => {
  //     this.logins = login;
  //   })
  // }
}
