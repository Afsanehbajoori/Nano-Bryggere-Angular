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
  argang:Date;

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.olId= JSON.parse(localStorage.getItem('olId') || '{}');
    console.log('olId' , this.olId);
    this.loadOl();
  }

  loadOl(){
    this.restApi.getData(this.olId , this.endpointO).subscribe(data => {
      this.olInfo = data;
      console.log('detajler:' , this.olInfo.årgang)
      this.argang=this.olInfo.årgang;
       console.log('date:' , this.argang)
    })
  }

}
