import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-mine-events',
  templateUrl: './mine-events.component.html',
  styleUrls: ['./mine-events.component.css']
})
export class MineEventsComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
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
  clickButton:boolean = true;

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


  onViseEvent(id:any){
    this.clickButton=false;
    //console.log('id:', id);
    this.restApi.getData(id , this.endpointD).subscribe(data => {
      this.eventList= data ;
      this.restApi.getData(this.eventList.eventsId , this.endpointE).subscribe(data => {
        this.eventList= data ;
      })

    })

  }
  onFindEvent(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
     this.restApi.getDeltagerByEventsTitel(this.searchkey , this.endpointE).subscribe(data => {
       this.listDeltagelser=data;
       console.log('hi:', this.listDeltagelser)
     })
    }
  }

  onAfmeldEvent(id:any){
    this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefSlet.afterClosed().subscribe(result => {
      if (result) {
    this.restApi.deleteData(id , this.endpointD).subscribe(data => {
      this.ngOnInit();
      })
    }
  });
  }

}
