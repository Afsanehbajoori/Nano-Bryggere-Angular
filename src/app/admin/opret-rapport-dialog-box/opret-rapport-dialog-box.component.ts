import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-opret-rapport-dialog-box',
  templateUrl: './opret-rapport-dialog-box.component.html',
  styleUrls: ['./opret-rapport-dialog-box.component.css']
})

export class OpretRapportDialogBoxComponent implements OnInit {
  @Input() forumOprettelse = {titel: '', besked: '', brugerId: 0};

  CreateForm: any = new FormGroup({});
  endpointF = '/Forumer';
  eventsList:any;
  eventBilled:any;
  brugerId:any;
  constructor(
    public dialogRefOpretteEvents : MatDialogRef<OpretRapportDialogBoxComponent>,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      besked: new FormControl('', Validators.required)
    });
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
  }

  onSubmitEvent() {
    this.forumOprettelse.brugerId = this.brugerId;
    this.restApi.createData(this.forumOprettelse, this.endpointF).subscribe((data) => {
      this.dialogRefOpretteEvents.close();
      // this.router.navigate(['../events/events'])
    })
  }
}