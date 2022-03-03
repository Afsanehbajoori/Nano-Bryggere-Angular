import { Component, OnInit ,ChangeDetectionStrategy , ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { VisDetajlerComponent } from '../vis-detajler/vis-detajler.component';
import { VisOlDetajlerComponent } from '../vis-ol-detajler/vis-ol-detajler.component';


@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})

export class ForsideComponent implements OnInit {
  //eventid = 20;
  events: Events[];
  event = new Events;
  endpointE = '/Events';
  eventList : any = {};
  bryggeri: Bryggeri[];
  endpointB='/Bryggerier';
  endpointO = '/Øller';
  olList:any;


  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEvent();
    this.loadBryggeri();
    this.loadOl();
  }

  loadEvent() {
    return this.restApi.getDatas(this.endpointE).subscribe((data) => {
      this.events = data;
      console.log(this.events)
    });
  }

  loadBryggeri(){
    return this.restApi.getDatas(this.endpointB).subscribe((data) => {
      this.bryggeri = data;
      console.log('bryggeriList:',this.bryggeri);
    })
  }
  loadOl(){
    return this.restApi.getDatas(this.endpointO).subscribe((data) => {
      this.olList = data;
      console.log('olList:',this.olList);
    })
  }

  visOlDetajler(id:any){
    console.log('click', id);
    this.dialog.open(VisOlDetajlerComponent);
    localStorage.setItem('olId' , id);
  }

  visDetajler(id:any){
    console.log('click', id);
    this.dialog.open(VisDetajlerComponent);
    localStorage.setItem('bryggeriId' , id);

  }



}
