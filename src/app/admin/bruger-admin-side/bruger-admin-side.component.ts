import { Component, OnInit } from '@angular/core';
import { MatDialog , MatDialogConfig ,MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bruger } from 'src/app/Models/Bruger';
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
  user = new Bruger();
  endpointB='/Brugere';
  endpointk = '/Kontaktoplysninger';
  searchkeyBrugernavn: string;
  searchkeyBrugerEnavn:string;
  searchkeyEmail:string;
  searchkeyEventsTitel:string;
  kontaktoplysninger:any;
  id = this.actRoute.snapshot.params['id'];
  kontaktoplysningerId:number;
  clickButton:boolean=true;
  kontaktoplysningerList: any;
  kontakt:Kontaktoplysninger[];



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
    return this.restApi.getDatas(this.endpointB).subscribe((res) => {
        this.users = res;
        console.log(this.users);
      })
  }


  onVisBruger(id:any){
      this.clickButton=false;
      return this.restApi.getData(id , this.endpointB).subscribe((data) => {
        this.kontaktoplysningerId=data.kontaktoplysningerId;
        this.restApi.getData(this.kontaktoplysningerId ,this.endpointk ).subscribe((data) => {
          this.kontaktoplysninger = data;
        })
      })
  }



  onFindBrugerenavn(){
    if(this.searchkeyBrugernavn == ""){
      this.ngOnInit();
    }
    else{
      this.users = this.users.filter(res =>{
      return  res.brugernavn.toLowerCase().match(this.searchkeyBrugernavn.toLowerCase());

      })
    }
  }


  onFindBrugereEnavn(){
    if(this.searchkeyBrugerEnavn ==''){
      this.ngOnInit();
    }
     else{
      this.restApi.getDataByEnavn(this.searchkeyBrugerEnavn , this.endpointB).subscribe((data) => {
        return this.users=data;
      })
        }
  }


  onFindEmail(){
    if(this.searchkeyEmail == ""){
      this.ngOnInit();
    }
    else{
      this.restApi.getDataByEmail(this.searchkeyEmail , this.endpointB).subscribe((data) => {
        return this.users=data;
      })


     }
  }

  onFindBrugerenavnByEventsTitel(){
    if(this.searchkeyEventsTitel == ""){
      this.ngOnInit();
    }
    else{
      this.restApi.getBrugerByEventsTitel(this.searchkeyEventsTitel , this.endpointB).subscribe((data) => {
        return this.users=data;
      })
     }
  }


//husk at kigge på slet bruger , kan ikke sltettes før slet deltager og login
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
        this.restApi.deleteData(id , this.endpointB).subscribe((data) => {
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
    dialogConfig.width = "30%";
    this.restApi.getData(id , this.endpointB).subscribe((data) => {
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
