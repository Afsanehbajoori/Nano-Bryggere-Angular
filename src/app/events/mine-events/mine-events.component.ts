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
  dialogRefDelete: MatDialogRef<SletDialogBoxComponent>;
  events: Events[];
  eventId: number;
  endpointE = '/Events';
  endpointP = '/Deltageres';
  searchkey: string;
  participatione: boolean;
  listParticipation:any;
  userId:number;
  eventList:any;
  id = this.actRoute.snapshot.params['id'];
  clickButton:boolean = true;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.onloadParticipation();
  }

  onloadParticipation(){
    this.restApi.getDatas(this.endpointP).subscribe(data => {
      this.listParticipation=data
      if(this.userId){
        this.listParticipation = this.listParticipation.filter((a:any) => a.userId === this.userId);
              }
    })
  }

  onShowEvent(id:any){
    this.clickButton=false;
    //console.log('id:', id);
    this.restApi.getData(id , this.endpointP).subscribe(data => {
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
       this.listParticipation=data;
       console.log('hi:', this.listParticipation)
     })
    }
  }

  onAfmeldEvent(id:any){
    this.dialogRefDelete = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
    this.restApi.deleteData(id , this.endpointP).subscribe(data => {
      this.ngOnInit();
      })
    }
  });
  }
}