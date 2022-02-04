import { Component, OnInit } from '@angular/core';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
  beertests: Øl[];
  endpoints = '/Øller';

  constructor(
    public restApi: RestApiService,
  ) { }

  ngOnInit(): void {
    // this.loadOl()
  }
  // loadOl(){
  //   return this.restApi.getDatas(this.endpoints).subscribe((data: any = []) => {
  //     this.beertests = data;
  //   })
  // }
}
