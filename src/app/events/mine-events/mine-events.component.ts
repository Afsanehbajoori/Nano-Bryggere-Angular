import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-mine-events',
  templateUrl: './mine-events.component.html',
  styleUrls: ['./mine-events.component.css']
})
export class MineEventsComponent implements OnInit {
  events: Events[];
  eventId: number;
  endpointE = '/Events';
  endpointD = '/Deltageres';
  searchkey: string;
  deltagelse: boolean;
  listDeltagelser:any;
  brugerId:number;
  eventList:any;
  id = this.actRoute.snapshot.params['id'];

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.loadDeltaglser();
  }

  loadDeltaglser(){
    this.restApi.getDatas(this.endpointD).subscribe(data => {
      this.listDeltagelser=data
      if(this.brugerId){
        this.listDeltagelser = this.listDeltagelser.filter((a:any) => a.brugerId === this.brugerId);
      }
    })
  }

  //den virker ikke , kig igen
  onViseEvent(id:any){
    this.restApi.getData(id , this.endpointD).subscribe(data => {

      this.eventList= data ;
      console.log(data)
    })

}
  onFindEvent(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.events = this.events.filter(res =>{
        return res.titel.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }
  onAfmeldEvent(id:any){
    this.restApi.updateData(id, this.endpointE, this.events).subscribe((data) => {
    });
  }
}
