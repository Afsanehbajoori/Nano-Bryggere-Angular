import { Component, OnInit } from '@angular/core';
import { MatDialog , MatDialogConfig ,MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bruger } from 'src/app/Models/Bruger';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { RedigerProfilDialogBoxComponent } from 'src/app/main/rediger-profil-dialog-box/rediger-profil-dialog-box.component';


@Component({
  selector: 'app-bruger-admin-side',
  templateUrl: './bruger-admin-side.component.html',
  styleUrls: ['./bruger-admin-side.component.css']
})
export class BrugerAdminSideComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefRedigerProfil: MatDialogRef<RedigerProfilDialogBoxComponent>;
  users: Bruger[];
  user = new Bruger;
  endpoints='/Brugere'
  endpointk = '/Kontaktoplysninger';
  searchkey: string;
  kontaktoplysninger:any;
  id = this.actRoute.snapshot.params['id'];
  kontaktoplysningerId:number;
  clickButton:boolean=true;
  kontaktoplysningerList: any;




  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadBruger();

  }

  loadBruger(){

    return this.restApi.getDatas(this.endpoints).subscribe((user) => {
      this.users = user;
      console.log(this.users);

    })

  }
  onVisBruger(id:any){
      this.clickButton=false;
      return this.restApi.getData(id , this.endpoints).subscribe((data) => {
        //console.log("kontId:",data.kontaktoplysningerId);
        this.kontaktoplysningerId=data.kontaktoplysningerId;
        this.restApi.getData(this.kontaktoplysningerId ,this.endpointk ).subscribe((data) => {
          this.kontaktoplysninger = data;

        })
      })

  }

 onFindBrugere(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.users = this.users.filter(res =>{
        return res.brugernavn.toLowerCase().match(this.searchkey.toLowerCase());
      })

    }

  }

  onSletBruger(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      /* this.restApi.getData(id , this.endpoints).subscribe((data) => {
        this.kontaktoplysningerId= data.kontaktoplysningerId;
        console.log("kontId:",this.kontaktoplysningerId);
        this.restApi.deleteData(this.kontaktoplysningerId, this.endpointk).subscribe(data => {
          this.loadBruger();
        })
      })*/
      if(result){
        this.restApi.deleteData(id , this.endpoints).subscribe((data) => {
          console.log('delete:' , id);
          this.loadBruger();
        })
      }

    });
  }

   onUpdateBruger(id:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.restApi.getData(id , this.endpoints).subscribe((data) => {
    this.kontaktoplysningerId= data.kontaktoplysningerId;
    console.log("kontId:",this.kontaktoplysningerId);
    localStorage.setItem('kontaktoplysningerId' , this.kontaktoplysningerId.toString());
    this.dialogRefRedigerProfil = this.dialog.open(RedigerProfilDialogBoxComponent, dialogConfig);
    this.dialogRefRedigerProfil.afterClosed().subscribe(result => {
      if (result) {
        this.kontaktoplysningerList = result;
        this.restApi.updateData(this.kontaktoplysningerId, this.endpointk, this.kontaktoplysningerList).subscribe((data) => {
        console.log(this.kontaktoplysningerList);
        this.onVisBruger(id);
        })
      }
    });
    })


  };


}
