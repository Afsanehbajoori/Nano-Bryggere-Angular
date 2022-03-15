import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';


@Component({
  selector: 'app-deltager-admin-side',
  templateUrl: './deltager-admin-side.component.html',
  styleUrls: ['./deltager-admin-side.component.css']
})

export class DeltagerAdminSideComponent implements OnInit {
  clickButton:boolean=true;
  deltagerList:any;
  deltagere:any;
  endpointD='/Deltageres';


  constructor(public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadDeltagelse();
  }

  loadDeltagelse(){
    this.restApi.getDatas(this.endpointD).subscribe(data =>
      this.deltagere=data)
  }

  onVisDeltager(id:any){
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointD).subscribe(data => {
      this.deltagerList=data;
    })

  }

  onJoinDeltager(any:any){

  }

  onAfmeldDeltager(id:any){
    this.restApi.deleteData(id , this.endpointD).subscribe(data =>
      this.ngOnInit())

  }

}
