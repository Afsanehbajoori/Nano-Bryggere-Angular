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
  deltagerListD:any;
  deltagerListB:any;
  deltagere:any;
  deltagerListE:any;
  endpointD='/Deltageres';
  endpointE = '/Events';
  endpointB='/Brugere';
  searchkeyDeltager:string;


  constructor(public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadDeltagelse();
  }
  loadDeltagelse(){
    this.restApi.getDatas(this.endpointD).subscribe(data =>
      this.deltagere=data
      )}

  onVisDeltager(id:any){
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointD).subscribe(deltag => {
      this.deltagerListD=deltag;
      this.restApi.getData(deltag.brugerId , this.endpointB).subscribe(bruger => {
        this.deltagerListB=bruger;
      })
      this.restApi.getData(deltag.eventsId , this.endpointE).subscribe(data => {
        this.deltagerListE=data;
      })
    })
  }

  onFindDeltager(){
    if(this.searchkeyDeltager == ""){
      this.ngOnInit();
    }
    else{
      this.restApi.getDeltagerByEventsTitel(this.searchkeyDeltager.toLowerCase() , this.endpointE).subscribe(res => {
        return this.deltagere=res
      })
    }
  }


  onAfmeldDeltager(id:any){
    this.restApi.deleteData(id , this.endpointD).subscribe(data =>
      this.ngOnInit())

  }

}
