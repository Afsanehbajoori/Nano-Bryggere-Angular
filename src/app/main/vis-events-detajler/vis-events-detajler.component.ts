import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vis-events-detajler',
  templateUrl: './vis-events-detajler.component.html',
  styleUrls: ['./vis-events-detajler.component.css']
})
export class VisEventsDetajlerComponent implements OnInit {
  endpointE = '/Events';
  eventsId:number;
  eventInfo:any;

  constructor(public restApi: RestApiService , private route : Router) { }

  ngOnInit(): void {
    this.eventsId= JSON.parse(localStorage.getItem('eventsId') || '{}');
    // console.log('event' , this.eventsId);
    this.onLoadBeer();
  }

  onLoadBeer(){
    this.restApi.getData(this.eventsId , this.endpointE).subscribe(data => {
      this.eventInfo = data;
      // console.log('detajler:' , this.eventInfo)
    })
  }

  onJoinEvents(id:any){
      this.route.navigate(['../login/login']);
  }
}