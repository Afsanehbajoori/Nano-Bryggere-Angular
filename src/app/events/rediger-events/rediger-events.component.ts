import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-rediger-events',
  templateUrl: './rediger-events.component.html',
  styleUrls: ['./rediger-events.component.css']
})
export class RedigerEventsComponent implements OnInit {
  eventid = this.actRoute.snapshot.params['id'];
  RedigerForm: FormGroup;
  endpoints = '/Events';
  eventList : any = {};
  constructor(
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.RedigerForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      // startDato: new FormControl('', Validators.required),
      // slutDato: new FormControl('', Validators.required),
      lokation: new FormControl('', Validators.required)
    });
    this.loadEvent(); 
  }

  loadEvent(){
    return this.restApi.getData(this.eventid, this.endpoints).subscribe((beer: {}) => {
      this.eventList = beer;
    });
  }

  onAnnullerEvent() {
    return this.router.navigate(['../events/events'])
  };

  onSubmitEvent() {
    this.restApi.updateData(this.eventid, this.endpoints, this.eventList).subscribe((data) => {
      this.router.navigate(['../events/events'])
    })
  }
}
