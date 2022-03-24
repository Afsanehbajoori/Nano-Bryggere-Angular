import { Component, OnInit } from '@angular/core';
import { MatDialog , MatDialogConfig ,MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { User } from 'src/app/Models/User';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { ContactInformation } from 'src/app/Models/ContactInformation';
import { RedigerProfilDialogBoxComponent } from 'src/app/main/rediger-profil-dialog-box/rediger-profil-dialog-box.component';

@Component({
  selector: 'app-bruger-admin-side',
  templateUrl: './bruger-admin-side.component.html',
  styleUrls: ['./bruger-admin-side.component.css']
})

export class BrugerAdminSideComponent implements OnInit {
  dialogRefDelete: MatDialogRef<SletDialogBoxComponent>;
  dialogRefUpdateProfile: MatDialogRef<RedigerProfilDialogBoxComponent>;
  users: User[];
  user = new User();
  endpointU='/Users'; //endpointB
  endpointC = '/ContactInformation'; //endpointK
  searchkeyUsername: string;
  searchkeyUserSname:string;
  searchkeyEmail:string;
  searchkeyEventsTitle:string;
  userinfo:any; //kontaktoplysninger
  id = this.actRoute.snapshot.params['id'];
  userinfoId:number; //kontaktoplysningerId
  clickButton:boolean=true;
  userinfoList: any; //kontaktoplysningerList
  info:ContactInformation[]; //kontakt

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onLoadUser();
  }

  onLoadUser(){
    return this.restApi.getDatas(this.endpointU).subscribe((res) => {
        this.users = res;
        console.log(this.users);
      })
  }

  onShowUser(id:any){
      this.clickButton=false;
      return this.restApi.getData(id , this.endpointU).subscribe((data) => {
        this.userinfoId=data.kontaktoplysningerId;
        this.restApi.getData(this.userinfoId ,this.endpointC ).subscribe((data) => {
          this.userinfo = data;
        })
      })
  }

  onFindUsername(){
    if(this.searchkeyUsername == ""){
      this.ngOnInit();
    }
    else{
      this.users = this.users.filter(res =>{
      return  res.username.toLowerCase().match(this.searchkeyUsername.toLowerCase());

      })
    }
  }

  onFindUserSname(){
    if(this.searchkeyUserSname ==''){
      this.ngOnInit();
    }
     else{
      this.restApi.getDataBySname(this.searchkeyUserSname , this.endpointU).subscribe((data) => {
        return this.users=data;
      })
        }
  }

  onFindEmail(){
    if(this.searchkeyEmail == ""){
      this.ngOnInit();
    }
    else{
      this.restApi.getDataByEmail(this.searchkeyEmail , this.endpointU).subscribe((data) => {
        return this.users=data;
      })


     }
  }

  onFindUsernameByEventsTitle(){
    if(this.searchkeyEventsTitle == ""){
      this.ngOnInit();
    }
    else{
      this.restApi.getUserByEventsTitle(this.searchkeyEventsTitle , this.endpointU).subscribe((data) => {
        return this.users=data;
      })
     }
  }

//husk at kigge på slet bruger , kan ikke sltettes før slet deltager og login
  onDeleteUser(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      /* this.restApi.getData(id , this.endpoints).subscribe((data) => {
        this.kontaktoplysningerId= data.kontaktoplysningerId;
        console.log("kontId:",this.kontaktoplysningerId);
        this.restApi.deleteData(this.kontaktoplysningerId, this.endpointK).subscribe(data => {
          this.loadBruger();
        })
      })*/
      if(result){
        this.restApi.deleteData(id , this.endpointU).subscribe((data) => {
          console.log('delete:' , id);
          this.onLoadUser();
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
    this.userinfoId= data.kontaktoplysningerId;
    console.log("kontId:",this.userinfoId);
    localStorage.setItem('ContactInformationId' , this.userinfoId.toString());
    this.dialogRefUpdateProfile = this.dialog.open(RedigerProfilDialogBoxComponent, dialogConfig);
    this.dialogRefUpdateProfile.afterClosed().subscribe(result => {
      if (result) {
        this.userinfoList = result;
        this.restApi.updateData(this.userinfoId, this.endpointC, this.userinfoList).subscribe((data) => {
        console.log(this.userinfoList);
        this.onShowUser(id);
        })
      }
    });
    })
  };
}