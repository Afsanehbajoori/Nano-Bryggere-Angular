import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';
@Component({
  selector: 'app-eventkalender-side',
  templateUrl: './eventkalender-side.component.html',
  styleUrls: ['./eventkalender-side.component.css']
})
export class EventkalenderSideComponent implements OnInit {
  eventtest: Events[];
  event = new Events;
  endpoints = '/Events';
  constructor(
    public restApi: RestApiService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEvent()
  }
  loadEvent(){
    return this.restApi.getDatas(this.endpoints).subscribe((events) => {
      this.eventtest = events;
    })
  }
  onOpretEvents() {
    this.router.navigate(['../events/oprette']);
  };
}
