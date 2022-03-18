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
  endpointP='/Deltageres';
  endpointE = '/Events';
  endpointU='/Brugere';
  searchkeyDeltager:string;

  constructor(public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.onloadParticipants();
  }
  onloadParticipants(){
    this.restApi.getDatas(this.endpointP).subscribe(data =>
      this.participants=data
      )}

  onShowParticipants(id:any){
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointP).subscribe(deltag => {
      this.participantsListD=deltag;
      this.restApi.getData(deltag.brugerId , this.endpointU).subscribe(bruger => {
        this.participantsListB=bruger;
      })
      this.restApi.getData(deltag.eventsId , this.endpointE).subscribe(data => {
        this.participantsListE=data;
      })
    })
  }

  onFindParticipants(){
    if(this.searchkeyDeltager == ""){
      this.ngOnInit();
    }
    else{
      this.restApi.getDeltagerByEventsTitel(this.searchkeyDeltager.toLowerCase() , this.endpointE).subscribe(res => {
        return this.participants=res
      })
    }
  }

  onAfmeldLoadParticipation(id:any){
    this.restApi.deleteData(id , this.endpointP).subscribe(data =>
      this.ngOnInit())
  }

}
