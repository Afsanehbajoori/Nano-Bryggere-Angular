import { Component, OnInit ,ChangeDetectionStrategy , ViewEncapsulation} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { VisDetajlerComponent } from '../vis-detajler/vis-detajler.component';
import { VisEventsDetajlerComponent } from '../vis-events-detajler/vis-events-detajler.component';
import { VisOlDetajlerComponent } from '../vis-ol-detajler/vis-ol-detajler.component';
import { Øl } from 'src/app/Models/Øl';


@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})

export class ForsideComponent implements OnInit {
  events: Events[];
  bryggeriListe: Bryggeri[];
  olListe: Øl [];
  event = new Events;
  eventListe : any = {};
  endpointB='/Bryggerier';
  endpointBr = '/Øller';
  endpointE = '/Events';

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
  ) { }

  ngOnInit(): void {
    this.onHentEvent();
    this.onHentBryggeri();
    this.onHentOl();
  }

  onHentEvent() {
    return this.restApi.getDatas(this.endpointE).subscribe((data) => {
      this.events = data;
      //console.log(this.events)
    });
  }

  onHentBryggeri(){
    return this.restApi.getDatas(this.endpointB).subscribe((data) => {
      this.bryggeriListe = data;
      //console.log('bryggeriList:',this.bryggeri);
    })
  }
  
  onHentOl(){
    return this.restApi.getDatas(this.endpointBr).subscribe((data) => {
      this.olListe = data;
      //console.log('olList:',this.olList);
    })
  }

  onVisOlDetaljer(id:any){
    //console.log('click', id);
    this.dialog.open(VisOlDetajlerComponent , {
      width:'400px',
      height:'300'

    });
    localStorage.setItem('olId' , id);
  }

  onVisDetaljer(id:any){
    //console.log('click', id);
    this.dialog.open(VisDetajlerComponent , {
      width:'400px',
      height:'auto'

    });
    localStorage.setItem('bryggeriId' , id);
  }

  onVisEventsDetaljer(id:any){
    // console.log('click', id);
    this.dialog.open(VisEventsDetajlerComponent , {
      width:'400px',
      height:'auto'
    });
    localStorage.setItem('eventsId' , id);
    // console.log('eventsId' , id)
  }
}