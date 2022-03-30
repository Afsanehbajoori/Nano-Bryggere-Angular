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
  deltagelserListD:any;
  deltagelserListB:any;
  deltager:any;
  deltagelserListE:any;
  endpointD='/Deltager';
  endpointE = '/Events';
  endpointB='/Bruger';
  searchkeyDeltager:string;

  constructor(public dialog: MatDialog,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.onHentDeltagelser();
  }
  onHentDeltagelser(){
    this.restApi.getDatas(this.endpointD).subscribe(data =>
      this.deltager=data
    )
  }

  onVisDeltager(id:any){
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointD).subscribe(deltager => {
      this.deltagelserListD=deltager;
      this.restApi.getData(deltager.brugerId , this.endpointB).subscribe(bruger => {
        this.deltagelserListB=bruger;
      })
      this.restApi.getData(deltager.eventsId , this.endpointE).subscribe(data => {
        this.deltagelserListE=data;
      })
    })
  }

  onFindDeltager(){
    if(this.searchkeyDeltager == ""){
      this.ngOnInit();
    }
    else{
      this.restApi.getEventParticipantsByUsername(this.searchkeyDeltager.toLowerCase(), this.endpointE).subscribe(res => {
        return this.deltager=res
      })
    }
  }

  onAfvisDeltagelse(id:any){
    this.restApi.deleteData(id , this.endpointD).subscribe(data =>
      this.ngOnInit())
  }
}