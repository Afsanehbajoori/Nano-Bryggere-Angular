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
  @Input() eventCreation = { title: '', description: '', location: '' };
  createForm: FormGroup;
  endpoints = '/Events';

  constructor(
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      // startDato: new FormControl('', Validators.required),
      // slutDato: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });
  }
  onCancelEvent() {
    return this.router.navigate(['../events/events'])
  };

  onSubmitEvent() {
    // console.log(this.eventCreation);
    this.restApi.createData(this.eventCreation, this.endpoints).subscribe((data) => {
      this.router.navigate(['../events/events'])
    })
  }
}