import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { RedigerSamarbejdeDialogBoxComponent } from '../update-cooperation-dialog-box/rediger-samarbejde-dialog-box.component';
import { SletDialogBoxComponent } from '../delete-dialog-box/slet-dialog-box.component';

@Component({
  selector: 'app-samarbejde-visning',
  templateUrl: './samarbejde-visning.component.html',
  styleUrls: ['./samarbejde-visning.component.css']
})
export class SamarbejdeVisningComponent implements OnInit {
  beer: Øl;
  ølId: number;
  endpointo = '/Øller';
  dialogRefRedigerSamarbejde: MatDialogRef<RedigerSamarbejdeDialogBoxComponent>;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ølId=JSON.parse(localStorage.getItem('sOlId') || '{}');
    this.onVisSamarbejde();
  }
  onVisSamarbejde() {
        this.restApi.getData(this.ølId, this.endpointo).subscribe(data => {
        this.beer = data;
      })
  }

  onRedigerOl(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefRedigerSamarbejde = this.dialog.open(RedigerSamarbejdeDialogBoxComponent, dialogConfig);
    this.dialogRefRedigerSamarbejde.afterClosed().subscribe(result => {
      if (result) {
        this.beer = result;
        this.restApi.updateData(this.ølId, this.endpointo, this.beer).subscribe((data) => {
          console.log(this.beer);
        })
      }
    });
  };

  onSletOl(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true) {
        this.router.navigate(['../admin/admin/']);
      }
    });
  };
}