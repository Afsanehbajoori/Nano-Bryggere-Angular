import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-oprette',
  templateUrl: './oprette.component.html',
  styleUrls: ['./oprette.component.css']
})
export class OpretteComponent implements OnInit {
  @Input() eventOprettelse = { titel: '', beskrivelse: '', lokation: '' };
  OpretForm: FormGroup;
  eventtests: Event[];
  event: Event;
  endpoints = '/Events';

  constructor(
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.OpretForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      // startDato: new FormControl('', Validators.required),
      // slutDato: new FormControl('', Validators.required),
      lokation: new FormControl('', Validators.required)
    });
  }
  onAnnullerEvent() {
    return this.router.navigate(['../events/events'])
  };

  onSubmitEvent() {
    this.event;
    console.log(this.eventOprettelse);
    this.restApi.createData(this.eventOprettelse, this.endpoints).subscribe((data) => {
      console.log(data);
      this.router.navigate(['../events/events'])
    })
  }
}
