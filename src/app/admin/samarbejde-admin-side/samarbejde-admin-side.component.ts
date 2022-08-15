import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Samarbejde } from 'src/app/Models/Samarbejde';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { OpdaterSamarbejdeDialogBoxComponent } from '../opdater-samarbejde-dialog-box/opdater-samarbejde-dialog-box.component';
import { OpretSamarbejdeDialogBoxComponent } from '../opret-samarbejde-dialog-box/opret-samarbejde-dialog-box.component';

@Component({
  selector: 'app-samarbejde-admin-side',
  templateUrl: './samarbejde-admin-side.component.html',
  styleUrls: ['./samarbejde-admin-side.component.css']
})
export class SamarbejdeAdminSideComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefOpretSamarbejde: MatDialogRef<OpretSamarbejdeDialogBoxComponent>;
  dialogRefOpdaterSamarbejde: MatDialogRef<OpdaterSamarbejdeDialogBoxComponent>;
  searchkeySamarbejdeNavn: string;
  searchkeySamarbejdeBryggeri: string;
  clickButton: boolean = true;
  samarbejdeListe: any;
  samarbejder: Samarbejde[];
  bryggeriId1: Number;
  bryggeriId2: Number;
  bryggeri1: Bryggeri;
  bryggeri2: Bryggeri;
  bryggeriId: number;
  endpointS = '/Samarbejder';
  endpointB = '/Bryggerier';
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
  ) { }

  ngOnInit(): void {
    this.onHentSamarbejde();
  }

  onHentSamarbejde() {
    return this.restApi.getDatas(this.endpointS).subscribe((samarbejde) => {
      this.samarbejder = samarbejde;
    });
  }

  onVisSamarbejde(id: any) {
    this.clickButton = false;
    this.restApi.getData(id, this.endpointS).subscribe((samarbejde) => {
      this.samarbejdeListe = samarbejde;
      this.bryggeriId1 = samarbejde.bryggeriId1;
      this.bryggeriId2 = samarbejde.bryggeriId2;
      this.restApi.getData(this.bryggeriId1, this.endpointB).subscribe((bryggeri) => {
        this.bryggeri1 = bryggeri;
      });
      this.restApi.getData(this.bryggeriId2, this.endpointB).subscribe((bryggeri) => {
        this.bryggeri2 = bryggeri;
      });
    });
  }

  onOpretSamarbejde() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.height = '20%';
    this.dialogRefOpretSamarbejde = this.dialog.open(OpretSamarbejdeDialogBoxComponent, dialogConfig);
    this.dialogRefOpretSamarbejde.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  onOpdaterSamarbejde(id:any) {
    localStorage.setItem('samarbejdeId', JSON.stringify(id));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = 'auto';
    this.dialogRefOpdaterSamarbejde = this.dialog.open(OpdaterSamarbejdeDialogBoxComponent, dialogConfig);
    this.dialogRefOpdaterSamarbejde.afterClosed().subscribe(result => {
      if (result) {
        this.samarbejdeListe = result;
        this.restApi.updateData(id, this.endpointS, this.samarbejdeListe).subscribe((data) => {
          this.ngOnInit();
        })
      }
    })
  }

  onSletSamarbejde(id:any) {
    if (this.samarbejdeListe.length !== 0) {
      alert('Der er et problem');
    }
    else {
      let dialogRef = this.dialog.open(SletDialogBoxComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.restApi.deleteData(id, this.endpointS).subscribe((data) => {
            this.ngOnInit();
          })
        }
      });
    }
  }

  onFindSamarbejdeNavn(){
    if(this.searchkeySamarbejdeNavn == ""){
      this.ngOnInit();
    }
    else{
      this.samarbejder = this.samarbejder.filter(res =>{
        return res.titel.toLowerCase().match(this.searchkeySamarbejdeNavn.toLowerCase());
      })
    }
  }
  
  onFindSamarbejdeOl() {
    if (this.searchkeySamarbejdeBryggeri == '') {
      this.ngOnInit();
    }
    else {
      this.restApi.getDataByEnavn(this.searchkeySamarbejdeBryggeri, this.endpointS).subscribe((data) => {
        return this.samarbejder = data;
      })
    }
  }
}