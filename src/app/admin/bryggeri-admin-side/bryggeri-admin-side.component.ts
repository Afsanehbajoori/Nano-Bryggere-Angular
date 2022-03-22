import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RedigerBryggeriDialogBoxComponent } from 'src/app/main/rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bryggeri } from 'src/app/Models/Brewery';
import { RestApiService } from 'src/app/shared/rest-api.service';


@Component({
  selector: 'app-bryggeri-admin-side',
  templateUrl: './bryggeri-admin-side.component.html',
  styleUrls: ['./bryggeri-admin-side.component.css']
})
export class BryggeriAdminSideComponent implements OnInit {
  dialogRefDelete: MatDialogRef<SletDialogBoxComponent>;
  dialogRefUpdateBryggeri: MatDialogRef<RedigerBryggeriDialogBoxComponent>;
  bryggeri: Bryggeri[];
  brygge = new Bryggeri;
  endpointU = '/Brugere';
  endpointB='/Bryggerier';
  searchkeyBryggeriname: string;
  searchkeyBryggeriCooperation:string;
  id = this.actRoute.snapshot.params['id'];
  clickButton:boolean=true;
  bryggeriList: any;
  b: any ='';

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onloadBryggeri();
  }
  
  onloadBryggeri(){
    return this.restApi.getDatas(this.endpointB).subscribe((brygge) => {
      this.bryggeri = brygge;
      console.log(this.bryggeri);
    })
  }

  onShowBryggeri(id:any) {
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointB).subscribe((data) => {

    })
  };

  onFindBryggeriname(){
    if(this.searchkeyBryggeriname == ""){
      this.ngOnInit();
    }
    else{
      this.bryggeri = this.bryggeri.filter(res =>{
        return res.navn.toLowerCase().match(this.searchkeyBryggeriname.toLowerCase());
      })
    }
  }

//vi skal kigge på det efter oprette samarbejde component
  onFindBryggeriCooperation(){
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

  onDeleteBryggeri(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpointB).subscribe(data => {
        this.onloadBryggeri();
      })
    });
  };

  onUpdateBryggeri(id:any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      localStorage.setItem('bryggeriId' , id.toString());
      this.dialogRefUpdateBryggeri = this.dialog.open(RedigerBryggeriDialogBoxComponent, dialogConfig);
      this.dialogRefUpdateBryggeri.afterClosed().subscribe(result => {
        if (result) {
          this.bryggeriList = result;
          this.restApi.updateData(id, this.endpointB, this.bryggeriList).subscribe((data) => {
          console.log(this.bryggeriList);
          this.onShowBryggeri(id);
          this.onloadBryggeri();
          })
        }
      });
    };
}