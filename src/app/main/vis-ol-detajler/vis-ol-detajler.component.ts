import { Component, Input, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-vis-ol-detajler',
  templateUrl: './vis-ol-detajler.component.html',
  styleUrls: ['./vis-ol-detajler.component.css']
})
export class VisOlDetajlerComponent implements OnInit {
  beerId:number;
  endpointO = '/Øller';
  beerInfo: any;
  argang:Date;

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.beerId= JSON.parse(localStorage.getItem('olId') || '{}');
    console.log('olId' , this.beerId);
    this.onLoadBeer();
  }

  onLoadBeer(){
    this.restApi.getData(this.beerId , this.endpointO).subscribe(data => {
      this.beerInfo = data;
      console.log('detajler:' , this.beerInfo.årgang)
      this.argang=this.beerInfo.årgang;
       console.log('date:' , this.argang)
    })
  }

}
