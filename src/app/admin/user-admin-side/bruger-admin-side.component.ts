import { Component, OnInit } from '@angular/core';
import { MatDialog , MatDialogConfig ,MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/delete-dialog-box/slet-dialog-box.component';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { RedigerProfilDialogBoxComponent } from 'src/app/main/update-profil-dialog-box/rediger-profil-dialog-box.component';

@Component({
  selector: 'app-bruger-admin-side',
  templateUrl: './bruger-admin-side.component.html',
  styleUrls: ['./bruger-admin-side.component.css']
})
export class BrugerAdminSideComponent implements OnInit {
  dialogRefDelete: MatDialogRef<SletDialogBoxComponent>;
  dialogRefUpdateProfil: MatDialogRef<RedigerProfilDialogBoxComponent>;
  users: Bruger[];
  user = new Bruger();
  endpointU='/Brugere'; //S
  endpointI = '/Kontaktoplysninger'; //K
  searchkeyUsername: string;
  searchkeyUserLastName:string;
  searchkeyEmail:string;
  searchkeyEventsTitel:string;
  userInfo:any;
  id = this.actRoute.snapshot.params['id'];
  userInfoId:number;
  clickButton:boolean=true;
  userInfoList: any;
  userInfos:Kontaktoplysninger[];

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onloadUser();
  }

  onloadUser(){
    return this.restApi.getDatas(this.endpointU).subscribe((res) => {
        this.users = res;
        console.log(this.users);
      })
  }

  onShowUser(id:any){
      this.clickButton=false;
      return this.restApi.getData(id , this.endpointU).subscribe((data) => {
        this.userInfoId=data.kontaktoplysningerId;
        this.restApi.getData(this.userInfoId ,this.endpointI ).subscribe((data) => {
          this.userInfos = data;
        })
      })
  }

  onFindUsername(){
    if(this.searchkeyUsername == ""){
      this.ngOnInit();
    }
    else{
      this.users = this.users.filter(res =>{
      return  res.brugernavn.toLowerCase().match(this.searchkeyUsername.toLowerCase());

      })
    }
  }

  onFindUserByLastname(){
    if(this.searchkeyUserLastName ==''){
      this.ngOnInit();
    }
     else{
      this.restApi.getDataByEnavn(this.searchkeyUserLastName , this.endpointU).subscribe((data) => {
        return this.users=data;
      })
        }
  }

  onFindUserByEmail(){
    if(this.searchkeyEmail == ""){
      this.ngOnInit();
    }
    else{
      this.restApi.getDataByEmail(this.searchkeyEmail , this.endpointU).subscribe((data) => {
        return this.users=data;
      })


     }
  }

  onFindUsernameByEventsTitel(){
    if(this.searchkeyEventsTitel == ""){
      this.ngOnInit();
    }
    else{
      this.restApi.getBrugerByEventsTitel(this.searchkeyEventsTitel , this.endpointU).subscribe((data) => {
        return this.users=data;
      })
     }
  }

//husk at kigge på slet function
  onDeleteUser(id: any) {
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
        this.restApi.deleteData(id , this.endpointU).subscribe((data) => {
          console.log('delete:' , id);
          this.onloadUser();
        })
      }
    });
  }

   onUpdateUser(id:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.restApi.getData(id , this.endpointU).subscribe((data) => {
    this.userInfoId= data.kontaktoplysningerId;
    console.log("kontId:",this.userInfoId);
    localStorage.setItem('kontaktoplysningerId' , this.userInfoId.toString());
    this.dialogRefUpdateProfil = this.dialog.open(RedigerProfilDialogBoxComponent, dialogConfig);
    this.dialogRefUpdateProfil.afterClosed().subscribe(result => {
      if (result) {
        this.userInfoList = result;
        this.restApi.updateData(this.userInfoId, this.endpointI, this.userInfoList).subscribe((data) => {
        console.log(this.userInfoList);
        this.onShowUser(id);
        })
      }
    });
    })
  };
}