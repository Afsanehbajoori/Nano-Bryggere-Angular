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
  endpointD = '/Deltager';
  searchkey: string;
  deltager: boolean;
  deltagerListe:any;
  brugerId:number;
  eventListe:any;
  id = this.actRoute.snapshot.params['id'];
  clickButton:boolean = true;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.onHentDeltager();
  }

  onHentDeltager(){
    this.restApi.getDatas(this.endpointD).subscribe(data => {
      this.deltagerListe=data
      if(this.brugerId){
        this.deltagerListe = this.deltagerListe.filter((a:any) => a.brugerId === this.brugerId);
      }
    })
  }

  // onHentEvent(){
  //   this.restApi.getDatas(this.endpointE).subscribe(data => {
  //     this.eventListe=data
  //     if(this.brugerId){
  //       this.eventListe = this.eventListe.filter((a:any) => a.id === this.deltagerListe.eventid);
  //     }
  //   })
  // }

  onVisEvent(id:any){
    this.clickButton=false;
    this.restApi.getData(id , this.endpointD).subscribe(data => {
      this.eventListe= data ;
      this.restApi.getData(this.eventListe.eventsId, this.endpointE).subscribe(data => {
        this.eventListe= data ;
      })

    })
  }

  onFindEvent(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
     this.restApi.getParticipantByEventsTitle(this.searchkey , this.endpointE).subscribe(data => {
       this.deltagerListe=data;
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