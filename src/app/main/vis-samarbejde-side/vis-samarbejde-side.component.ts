import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';
import { SamarbejdeOprettelseComponent } from './../samarbejde-oprettelse/samarbejde-oprettelse.component';
import { SamarbejdeRedigerComponent } from './../samarbejde-rediger/samarbejde-rediger.component';

@Component({
  selector: 'app-vis-samarbejde-side',
  templateUrl: './vis-samarbejde-side.component.html',
  styleUrls: ['./vis-samarbejde-side.component.css']
})
export class VisSamarbejdeSideComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefOpretSamarbejde: MatDialogRef<SamarbejdeOprettelseComponent>;
  dialogRefOpdaterSamarbejde: MatDialogRef<SamarbejdeRedigerComponent>;
  searchkey: string;
  samarbejdeList: any;
  bryggriList1: any;
  bryggriList2: any;
  bryggiNavn1: any;
  endpointS = '/Samarbejder';
  endpointB = '/Bryggerier';
  samarbejder: any;
  bryggrisNavn = new Array();
  id = this.actRoute.snapshot.params['id'];
  clickButton: boolean = true;
  bryggeriId: number;

  constructor(public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.onHentSamarbejde();
    this.onHentBryggeri();

  }

  //#region API
  //Vis bryggeri navn for eget bryggeri og den anden bryggeries navn
  onHentBryggeri() {
    this.restApi.getDatas(this.endpointB).subscribe(data => {
      this.bryggriList1 = data;
      // this.bryggriList1 = this.bryggriList1.filter()
    })
  }

  onHentSamarbejde() {
    return this.restApi.getDatas(this.endpointS).subscribe((data) => {
      this.samarbejder = data.filter((res:any) =>{
        return res.bryggeriId1 === this.bryggeriId || res.bryggeriId2 === this.bryggeriId;
      });
    })
  }
  //#endregion

  onFindSamarbejde() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.samarbejdeList = this.samarbejdeList.filter((res: any) => {
        return res.titel.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onVisSamarbejde(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointS).subscribe((data) => {
      this.samarbejdeList = data;
      this.restApi.getData(this.samarbejdeList.bryggeriId1, this.endpointB).subscribe((data) =>{
        this.bryggriList1 = data;
      })
      this.restApi.getData(this.samarbejdeList.bryggeriId2, this.endpointB).subscribe((data) =>{
        this.bryggriList2 = data;
      })
    })
  }

  onOpretSamarbejde() {
    if (JSON.stringify(this.bryggeriId) === '{}') {
      alert('du skal først oprette et bryggeri!')
    }
    /*  if(JSON.stringify(this.olId) === '{}'){
       alert('du skal også først oprette Øl')
     } */
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "25%";
      dialogConfig.height = '50%';
      this.dialogRefOpretSamarbejde = this.dialog.open(SamarbejdeOprettelseComponent, dialogConfig);
      this.dialogRefOpretSamarbejde.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    }
  }

  onSletSamarbejde(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(id, this.endpointS).subscribe((data) => {
          this.onHentSamarbejde();
        })
      }
    });
  }

  onOpdaterSamarbejde(id: any) {
    localStorage.setItem('samarbejdeId', JSON.stringify(id));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = 'auto';
    this.dialogRefOpdaterSamarbejde = this.dialog.open(SamarbejdeRedigerComponent, dialogConfig);
    this.dialogRefOpdaterSamarbejde.afterClosed().subscribe(result => {
      if (result) {
        this.samarbejdeList = result;
        this.restApi.updateData(id, this.endpointS, this.samarbejdeList).subscribe((data) => {
          this.ngOnInit();
        })
      }
    })
  }
}