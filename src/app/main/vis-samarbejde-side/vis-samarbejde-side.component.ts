import { Component, OnInit } from '@angular/core';
import { MatDialog ,  MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';
import { SamarbejdeOprettelseComponent } from './../samarbejde-oprettelse/samarbejde-oprettelse.component';
import { SamarbejdeRedigerComponent } from './../samarbejde-rediger/samarbejde-rediger.component';
import { Samarbejde } from 'src/app/Models/Samarbejde';

@Component({
  selector: 'app-vis-samarbejde-side',
  templateUrl: './vis-samarbejde-side.component.html',
  styleUrls: ['./vis-samarbejde-side.component.css']
})
export class VisSamarbejdeSideComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefOpretSamarbejde: MatDialogRef<SamarbejdeOprettelseComponent>;
  dialogRefOpdaterSamarbejde : MatDialogRef<SamarbejdeRedigerComponent>;
  searchkey:string;
  samarbejdeList:any;
  bryggriList:any;
  bryggiNavn1:any;
  endpointS = '/Samarbejder';
  endpointB = '/Bryggerier';
  samarbejder:any;
  bryggrisNavn= new Array();
  id = this.actRoute.snapshot.params['id'];
  clickButton: boolean = true;
  bryggeriId:number;

  constructor(  public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.bryggeriId=JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.onHentSamarbejde();
    this.onHentBryggeri();

  }

  onHentBryggeri(){
    this.restApi.getDatas(this.endpointB).subscribe(data => {
      this.bryggriList=data;
      console.log('Bryggerier' , this.bryggriList)
    })
  }

  onHentSamarbejde() {
     return this.restApi.getDatas(this.endpointS).subscribe((data) => {
        this.samarbejder=data;
        //console.log('samarbejde:',data)
      })
    }
    onVisSamarbejde(id:any){
      this.clickButton=false;
      return this.restApi.getData(id , this.endpointS).subscribe((data) => {
        this.samarbejdeList=data;
        console.log('samarbejdebryggeriId1:',this.samarbejdeList.bryggeriId1)
        console.log('samarbejdebryggeriId2:',this.samarbejdeList.bryggeriId2)
        

      })

    }

  onOpretSamarbejde(){
    if(JSON.stringify(this.bryggeriId) === '{}' ){
      alert('du skal først oprette et bryggeri!')
    }
   /*  if(JSON.stringify(this.olId) === '{}'){
      alert('du skal også først oprette Øl')
    } */
    else{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      dialogConfig.height = '50%';
      this.dialogRefOpretSamarbejde = this.dialog.open(SamarbejdeOprettelseComponent, dialogConfig);
      this.dialogRefOpretSamarbejde.afterClosed().subscribe(result => {
        this.ngOnInit();
      })


    }

  }
  onFindSamarbejde(){
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.samarbejdeList = this.samarbejdeList.filter((res:any) => {
        return res.titel.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }

  }
  onSletSamarbejde(id:any){
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(id, this.endpointS).subscribe((data) => {
          this.onHentSamarbejde();
        })
      }
    });

  }
  onOpdaterSamarbejde(id:any){
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
        })
      }
      this.ngOnInit();
    })
  }
}
