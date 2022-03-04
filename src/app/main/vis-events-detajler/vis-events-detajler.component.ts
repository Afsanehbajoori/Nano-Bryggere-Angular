import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-vis-events-detajler',
  templateUrl: './vis-events-detajler.component.html',
  styleUrls: ['./vis-events-detajler.component.css']
})
export class VisEventsDetajlerComponent implements OnInit {
  endpointE = '/Events';
  eventsId:number;
  eventInfo:any;

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.eventsId= JSON.parse(localStorage.getItem('olId') || '{}');
    console.log('bry' , this.eventsId);
    this.loadOl();
  }
  
  loadOl(){
    this.restApi.getData(this.eventsId , this.endpointE).subscribe(data => {
      this.eventInfo = data;
      console.log('detajler:' , this.eventInfo.titel)
    })
  }

}
