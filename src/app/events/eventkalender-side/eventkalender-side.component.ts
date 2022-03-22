import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MessageDialogBoxComponent } from '../message-dialog-box/message-dialog-box.component';

@Component({
  selector: 'app-eventkalender-side',
  templateUrl: './eventkalender-side.component.html',
  styleUrls: ['./eventkalender-side.component.css']
})
export class EventkalenderSideComponent implements OnInit {
  dialogRefDelete: MatDialogRef<SletDialogBoxComponent>;
  events: Events[];
  endpointE = '/Events';
  endpointP = '/Deltageres';
  searchkey: string;
  participation: boolean = false;
  buttonDisabled: boolean ;
  buttonEnabled: boolean;
  eventsId:number;
  userId:number;
  listparticipation:any;
  clickButton:boolean = true;
  eventList:any;
  id = this.actRoute.snapshot.params['id'];
  arrayListparticipation = new Array();
  participantId:number;
  list:any;
  isparticipant:boolean;
 @Input() participant = { brugerId:0 , eventsId:0 , isDeltage:false}

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.onloadEvent();
    this.onloadParticipation();
  }

  onloadEvent() {
    return this.restApi.getDatas(this.endpointE).subscribe((data) => {
      this.events = data;
  });
  }

  onloadParticipation(){
    this.restApi.getDatas(this.endpointP).subscribe(data => {
      this.listparticipation=data;
      if(this.userId){
        this.listparticipation = this.listparticipation.filter((a:any) => a.userId === this.userId);
        console.log('list:' , this.listparticipation);
        for(var d =0; d < this.listparticipation.length ; d++)
        {
          console.log('listId:' , this.listparticipation[d].eventsId);
          if(this.listparticipation[d].eventsId){
            this.arrayListparticipation.push(this.listparticipation[d].eventsId);
          }
        }
      }
   })
  }

 onShowEvent(id:any){
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointE).subscribe(data => {
      this.eventList=data;
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

  onJoinEvent(id:any){
    if(this.arrayListparticipation.includes(id) )
    {
      this.dialog.open(MessageDialogBoxComponent);
    }else{
        this.participant.brugerId=this.userId;
        this.participant.eventsId=id;
        this.participant.isDeltage=true;
        this.restApi.createData(this.participant , this.endpointP).subscribe(data => {
          this.onloadParticipation();
        })
    }
  }

  /* onAfmeldEvent(id:any){
    if(!this.arrayListDeltager.includes(id)){
      this.dialog.open(MessageDialogBoxComponent);
    }
    else
    {
      const deltagId=this.listDeltagelser.find((a:any) => a.brugerId === this.brugerId && a.eventsId == id);
      this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
        width: '300px',
        disableClose: true
      });
      this.dialogRefSlet.afterClosed().subscribe(result => {
        if (result) {
          this.restApi.deleteData(deltagId.id , this.endpointD).subscribe(data => {
              console.log('arrayList2:' , this.arrayListDeltager);
            })
      }
    })
    }
  } */
}