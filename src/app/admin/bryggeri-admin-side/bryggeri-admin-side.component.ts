import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RedigerBryggeriDialogBoxComponent } from 'src/app/main/rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Samarbejde } from 'src/app/Models/Samarbejde';
import { RestApiService } from 'src/app/shared/rest-api.service';


@Component({
  selector: 'app-bryggeri-admin-side',
  templateUrl: './bryggeri-admin-side.component.html',
  styleUrls: ['./bryggeri-admin-side.component.css']
})
export class BryggeriAdminSideComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefOpdaterBryggeri: MatDialogRef<RedigerBryggeriDialogBoxComponent>;
  bryggeri: any;
  bryg = new Bryggeri;
  endpointBru = '/Bruger';
  endpointB = '/Bryggerier';
  endpointS = '/Samarbejder';
  searchkeyBryggeriNavn: string;
  searchkeyBryggeriSamarbejde: string;
  id = this.actRoute.snapshot.params['id'];
  clickButton: boolean = true;
  bryggeriListe: Bryggeri[];
  brygge:Bryggeri;
  samarbejder:Samarbejde [];

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentBryggeri();
  }

  onHentBryggeri(){
    return this.restApi.getDatas(this.endpointB).subscribe((data) => {
      this.bryggeri = data;
      console.log(this.bryggeri);
    })
  }

  onVisBryggeri(id:any) {
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointB).subscribe((data) => {
    this.brygge=data;
      this.restApi.getDatas(this.endpointS).subscribe((data) =>{
        this.samarbejder = data.filter((res: any) => {
          return res.bryggeriId1 === id || res.bryggeriId2 === id;
        });
        console.log(this.samarbejder)
      })
    })
  };

  onFindBryggeriNavn() {
    if (this.searchkeyBryggeriNavn == "") {
      this.ngOnInit();
    }
    else{

      this.bryggeri = this.bryggeri.filter((res: any) => {

        return res.navn.toLowerCase().match(this.searchkeyBryggeriNavn.toLowerCase());
      })
    }
  }

  //vi skal kigge på det efter oprette samarbejde component
  onFindBryggeriSamarbejde() {
    /*    if(this.searchkeyBryggeriSamarbejde == ''){
         this.ngOnInit();
       }
       else{
         this.restApi.getDatas(this.endpointB).subscribe(res => {
         this. b = res.filter((a:any) => {
           if(a.id === Number(this.searchkeyBryggeriSamarbejde))
           {
             console.log(this.b)
           }
           })
         })
       } */
  }

  onSletBryggeri(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpointB).subscribe(data => {
        this.onHentBryggeri();
      })
    });
  };

  onOpdaterBryggeri(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    localStorage.setItem('bryggeriId', id.toString());
    this.dialogRefOpdaterBryggeri = this.dialog.open(RedigerBryggeriDialogBoxComponent, dialogConfig);
    this.dialogRefOpdaterBryggeri.afterClosed().subscribe(result => {
      if (result) {
        this.bryggeriListe = result;
        this.restApi.updateData(id, this.endpointB, this.bryggeriListe).subscribe((data) => {
          console.log(this.bryggeriListe);
          this.onVisBryggeri(id);
          this.onHentBryggeri();
        })
      }
    });
  };
}