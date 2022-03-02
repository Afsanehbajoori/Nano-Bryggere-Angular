import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.css']
})

export class ForsideComponent implements OnInit {
  //eventid = 20;
  public events: Events[];
  public event = new Events;
  endpoints = '/Events';
  eventList : any = {};

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEvent();
  }

  loadEvent() {
    return this.restApi.getDatas(this.endpoints).subscribe((data) => {
      this.events = data;
      console.log(this.events)
    });
  }

}
