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
  eventId = this.actRoute.snapshot.params['id'];
  opdaterForm: FormGroup;
  endpointE = '/Events';
  eventListe : any = {};
  constructor(
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.opdaterForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      startDato: new FormControl('', Validators.required),
      slutDato: new FormControl('', Validators.required),
      lokation: new FormControl('', Validators.required)
    });
    this.onHentEvent(); 
  }

  onHentEvent(){
    return this.restApi.getData(this.eventId, this.endpointE).subscribe((eventData: {}) => {
      this.eventListe = eventData;
    });
  }

  onAnullerEvent() {
    return this.router.navigate(['../events/events'])
  };

  onSubmitEvent() {
    this.restApi.updateData(this.eventId, this.endpointE, this.eventListe).subscribe((data) => {
      this.router.navigate(['../events/events'])
    })
  }
}