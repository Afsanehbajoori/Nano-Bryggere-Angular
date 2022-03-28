import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-admin-side',
  templateUrl: './ol-admin-side.component.html',
  styleUrls: ['./ol-admin-side.component.css']
})
export class OlAdminSideComponent implements OnInit {
  oller: Øl[];
  ol: Øl;
  endpointB = '/Øller';
  data = sessionStorage.getItem('id');
  searchkey: string;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.onHentOl()
  }

  onHentOl(){
    return this.restApi.getDatas(this.endpointB).subscribe((beer) => {
      this.oller = beer;
    });
  }

  onFindOl(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.restApi.getParticipantByEventsTitle(this.searchkey.toLowerCase(), this.endpointB).subscribe(res => {
        return this.oller=res
      })
    }
  }

  onSletOl(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpointB).subscribe(data => {
        this.onHentOl();
      })
    });
  };
}