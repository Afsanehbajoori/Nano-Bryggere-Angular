import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
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
  samarbejdeliste: any;
  samarbejder: Samarbejde[];
  bryggeri1: any;
  bryggeri2: any;
  bryggeri: any;
  bryggeriId: number;
  endpointS = '/Samarbejder';
  endpointB = '/Bryggerier';
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onHentSamarbejde();
  }

  onHentSamarbejde() {
    return this.restApi.getDatas(this.endpointS).subscribe((samarbejde) => {
      this.samarbejdeliste = samarbejde;
    });
  }

  onVisSamarbejde(id: any) {
    this.clickButton = false;
    return this.restApi.getDatas(this.endpointS).subscribe((samarbejde) => {
      this.samarbejdeliste = samarbejde;
      this.restApi.getDatas(this.endpointB).subscribe((bryggeri) => {
        // this.bryggeri1 = bryggeri.filter((res: any) => {
        //   return res.id === this.samarbejdeliste.bryggeriId1;
        // });
        this.bryggeri1 = bryggeri;
        this.bryggeri2 = bryggeri.filter((res: any) => {
          return res.id == this.samarbejdeliste.bryggeriId2;
        });
        console.log("samarbejde",this.samarbejdeliste);
        console.log("bryggeri",this.bryggeri);
        console.log("bryggeri 1",this.bryggeri1);
        console.log("bryggeri 2",this.bryggeri2);
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
    localStorage.setItem('tagId', JSON.stringify(id));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = 'auto';
    this.dialogRefOpdaterSamarbejde = this.dialog.open(OpdaterSamarbejdeDialogBoxComponent, dialogConfig);
    this.dialogRefOpdaterSamarbejde.afterClosed().subscribe(result => {
      if (result) {
        this.samarbejdeliste = result;
        console.log('date:', typeof (this.samarbejdeliste.startDato));
        this.restApi.updateData(id, this.endpointS, this.samarbejdeliste).subscribe((data) => {
        })
        console.log("Samarbejde Test",this.samarbejdeliste);
      }
      this.ngOnInit();
    })
  }

  onSletSamarbejde(id:any) {
    if (this.samarbejdeliste.length !== 0) {
      alert('Der er et problem');
    }
    else {
      let dialogRef = this.dialog.open(SletDialogBoxComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.restApi.deleteData(id, this.endpointS).subscribe((data) => {
            console.log('slet:', id);
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