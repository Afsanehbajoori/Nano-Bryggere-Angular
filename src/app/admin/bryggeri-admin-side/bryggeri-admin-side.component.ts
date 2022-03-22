import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RedigerBryggeriDialogBoxComponent } from 'src/app/main/rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Brewery } from 'src/app/Models/Brewery';
import { RestApiService } from 'src/app/shared/rest-api.service';


@Component({
  selector: 'app-bryggeri-admin-side',
  templateUrl: './bryggeri-admin-side.component.html',
  styleUrls: ['./bryggeri-admin-side.component.css']
})
export class BryggeriAdminSideComponent implements OnInit {
  dialogRefDelete: MatDialogRef<SletDialogBoxComponent>;
  dialogRefUpdateBrewery: MatDialogRef<RedigerBryggeriDialogBoxComponent>;
  Brewery: Brewery[];
  Brew = new Brewery;
  endpointU = '/Users';
  endpointB='/Breweries';
  searchkeyBreweryName: string;
  searchkeyBreweryCooperation:string;
  id = this.actRoute.snapshot.params['id'];
  clickButton:boolean=true;
  BreweryList: any;
  b: any ='';

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onLoadBrewery();
  }
  
  onLoadBrewery(){
    return this.restApi.getDatas(this.endpointB).subscribe((brew) => {
      this.Brewery = brew;
      console.log(this.Brewery);
    })
  }

  onShowBrewery(id:any) {
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointB).subscribe((data) => {

    })
  };

  onFindBreweryname(){
    if(this.searchkeyBreweryName == ""){
      this.ngOnInit();
    }
    else{
      this.Brewery = this.Brewery.filter(res =>{
        return res.name.toLowerCase().match(this.searchkeyBreweryName.toLowerCase());
      })
    }
  }

//vi skal kigge på det efter oprette samarbejde component
  onFindBreweryCooperation(){
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

  onDeleteBrewery(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpointB).subscribe(data => {
        this.onLoadBrewery();
      })
    });
  };

  onUpdateBrewery(id:any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      localStorage.setItem('bryggeriId' , id.toString());
      this.dialogRefUpdateBrewery = this.dialog.open(RedigerBryggeriDialogBoxComponent, dialogConfig);
      this.dialogRefUpdateBrewery.afterClosed().subscribe(result => {
        if (result) {
          this.BreweryList = result;
          this.restApi.updateData(id, this.endpointB, this.BreweryList).subscribe((data) => {
          console.log(this.BreweryList);
          this.onShowBrewery(id);
          this.onLoadBrewery();
          })
        }
      });
    };
}