import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  endpoints = '/Øller';

  constructor(
    public restApi: RestApiService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.loadOl()
  }
  loadOl(){
    // this.restApi.getData().subscribe((beer) => {
    //   th
    // })
    return this.restApi.getDatas(this.endpoints).subscribe((data: any = []) => {
      this.beertests = data;
    })
  }
}
