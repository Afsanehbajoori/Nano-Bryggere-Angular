import { Component, OnInit ,ChangeDetectionStrategy , ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Brewery } from 'src/app/Models/Brewery';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { VisDetajlerComponent } from '../vis-detajler/vis-detajler.component';
import { VisEventsDetajlerComponent } from '../vis-events-detajler/vis-events-detajler.component';
import { VisOlDetajlerComponent } from '../vis-ol-detajler/vis-ol-detajler.component';
import { Beer } from 'src/app/Models/Beer';


@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})

export class ForsideComponent implements OnInit {
  events: Events[];
  brewery: Brewery[];
  beerList: Beer [];
  event = new Events;
  eventList : any = {};
  endpointB='/Bryggerier';
  endpointO = '/Øller';
  endpointE = '/Events';

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
  ) { }

  ngOnInit(): void {
    this.onLoadEvent();
    this.onLoadBrewery();
    this.onLoadBeer();
  }

  onLoadEvent() {
    return this.restApi.getDatas(this.endpointE).subscribe((data) => {
      this.events = data;
      //console.log(this.events)
    });
  }

  onLoadBrewery(){
    return this.restApi.getDatas(this.endpointB).subscribe((data) => {
      this.brewery = data;
      //console.log('bryggeriList:',this.bryggeri);
    })
  }
  
  onLoadBeer(){
    return this.restApi.getDatas(this.endpointO).subscribe((data) => {
      this.beerList = data;
      //console.log('olList:',this.olList);
    })
  }

  onShowBeerDetails(id:any){
    //console.log('click', id);
    this.dialog.open(VisOlDetajlerComponent , {
      width:'400px',
      height:'300'

    });
    localStorage.setItem('olId' , id);
  }

  onShowDetails(id:any){
    //console.log('click', id);
    this.dialog.open(VisDetajlerComponent , {
      width:'400px',
      height:'auto'

    });
    localStorage.setItem('bryggeriId' , id);
  }

  onShowEventsDetails(id:any){
    console.log('click', id);
    this.dialog.open(VisEventsDetajlerComponent , {
      width:'400px',
      height:'auto'

    });
    localStorage.setItem('eventsId' , id);
    console.log('eventsId' , id)
  }
}