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
  searchkeyOlNavn: string;
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

  onFindOlNavn(){
    if (this.searchkeyOlNavn == "") {
      this.ngOnInit();
    }
    else {
      this.oller = this.oller.filter(res => {
        return res.navn.toLowerCase().match(this.searchkeyOlNavn.toLowerCase());
      })
    }
  }

  onSletOl(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.restApi.deleteData(id, this.endpointB).subscribe(data => {
          this.onHentOl();
        })
      }
    });
  };
}