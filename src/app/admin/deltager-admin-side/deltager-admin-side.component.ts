import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-deltager-admin-side',
  templateUrl: './deltager-admin-side.component.html',
  styleUrls: ['./deltager-admin-side.component.css']
})

export class DeltagerAdminSideComponent implements OnInit {
  clickButton:boolean=true;
  participantsListD:any;
  participantsListB:any;
  participants:any;
  participantsListE:any;
  endpointP='/Participation';
  endpointE = '/Events';
  endpointU='/Users';
  searchkeyParticipants:string;

  constructor(public dialog: MatDialog,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.onLoadParticipants();
  }
  onLoadParticipants(){
    this.restApi.getDatas(this.endpointP).subscribe(data =>
      this.participants=data
      )}

  onShowParticipants(id:any){
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointP).subscribe(participant => {
      this.participantsListD=participant;
      this.restApi.getData(participant.brugerId , this.endpointU).subscribe(bruger => {
        this.participantsListB=bruger;
      })
      this.restApi.getData(participant.eventsId , this.endpointE).subscribe(data => {
        this.participantsListE=data;
      })
    })
  }

  onFindParticipants(){
    if(this.searchkeyParticipants == ""){
      this.ngOnInit();
    }
    else{
      this.restApi.getParticipantByEventsTitle(this.searchkeyParticipants.toLowerCase() , this.endpointE).subscribe(res => {
        return this.participants=res
      })
    }
  }

  onRejectLoadParticipation(id:any){
    this.restApi.deleteData(id , this.endpointP).subscribe(data =>
      this.ngOnInit())
  }
}
