import { Component, Input, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-vis-ol-detajler',
  templateUrl: './vis-ol-detajler.component.html',
  styleUrls: ['./vis-ol-detajler.component.css']
})
export class VisOlDetajlerComponent implements OnInit {
  olId:number;
  endpointO = '/Øller';
  olInfo: any;
  vintage:Date;

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.olId= JSON.parse(localStorage.getItem('forsideOlId') || '{}');
    this.onHentOl();
  }

  onHentOl(){
    this.restApi.getData(this.olId , this.endpointO).subscribe(data => {
      this.olInfo = data;
      // this.vintage=this.beerInfo.vintage;
    })
  }
}