import { Component, OnInit } from '@angular/core';
import { MatDialog , MatDialogConfig ,MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-rolle-admin-side',
  templateUrl: './rolle-admin-side.component.html',
  styleUrls: ['./rolle-admin-side.component.css']
})
export class RolleAdminSideComponent implements OnInit {
  searchkeyRolename:string;
  searchkeyUsername:string;
  clickButton:boolean=true;
  endpointR='/Roller';
  endpointU='/Brugere';
  id = this.actRoute.snapshot.params['id'];
  users: Bruger[];
  roleId:number;
  Role:any;
  level:number;

  constructor( public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute) { }

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
      this.roleId=data.rolleId;
      this.restApi.getData(this.roleId ,this.endpointR ).subscribe((data) => {
        this.Role = data;

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

  onFindRolename(){
    if(this.searchkeyRolename == ""){
      this.ngOnInit();
    }
   else{
      if(this.searchkeyRolename.toLowerCase() == 'anonymbruger')
      this.level=0 ;
      if(this.searchkeyRolename.toLowerCase() == 'bruger')
      this.level=100;
      if(this.searchkeyRolename.toLowerCase() == 'moderator')
      this.level=200;
      if(this.searchkeyRolename.toLowerCase() == 'administrator')
      this.level=300 ;
      this.restApi.getDataByLevel(this.level , this.endpointU).subscribe((data) => {
        return  this.users=data;
     })
    }
  }
 
  onDeleteUser(id:any){
    if(this.users.length !==0){
        alert('Du skal først slette alle brger!')
    }else{
      let dialogRef = this.dialog.open(SletDialogBoxComponent);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.restApi.deleteData(id , this.endpointR).subscribe((data) => {
            console.log('delete:' , id);
            this.onloadUser();
          })
        }
      });
    }
  }

onDowngradeRolename(id:any){
  var user =this.users.find((x:any) => x.id === id)
  console.log('info:', user?.rolleId);
  var rolleId= user?.rolleId;
  this.restApi.getData(rolleId , this.endpointR).subscribe(data => {
    var upgradeLevel = data;
    console.log('upgradeLevel' ,upgradeLevel.level)
    if(upgradeLevel.level == 300){
      upgradeLevel.level = 200;
      upgradeLevel.rolleNavn = "Moderator";
    }
    else if(upgradeLevel.level == 200){
      upgradeLevel.level = 100;
      upgradeLevel.rolleNavn = "Bruger";
    }
    else if(upgradeLevel.level == 100){
      upgradeLevel.level = 0;
      upgradeLevel.rolleNavn = "Anonymbruger";
    }
    else if(upgradeLevel.level == 0){
      upgradeLevel.level = 0;
      upgradeLevel.rolleNavn = "Anonymbruger";
    }
    this.restApi.updateData(rolleId, this.endpointR,upgradeLevel).subscribe(data => {
        console.log('ny:',upgradeLevel.level);
        this.ngOnInit();
      })
  })
}

onUpgradeRolename(id:any){
  var user =this.users.find((x:any) => x.id === id)
  console.log('info:', user?.rolleId);
  var rolleId= user?.rolleId;
  this.restApi.getData(rolleId , this.endpointR).subscribe(data => {
    var upgradeLevel = data;
    console.log('upgradeLevel' ,upgradeLevel.level)
    if(upgradeLevel.level == 0){
      upgradeLevel.level = 100;
      upgradeLevel.rolleNavn = "Bruger";
    }
    else if(upgradeLevel.level == 100){
      upgradeLevel.level = 200;
      upgradeLevel.rolleNavn = "Moderator";
    }
    else if(upgradeLevel.level == 200){
      upgradeLevel.level = 300;
      upgradeLevel.rolleNavn = "Administrator";
    }
    else if(upgradeLevel.level == 300){
      upgradeLevel.level = 300;
      upgradeLevel.rolleNavn = "Administrator";
    }
    this.restApi.updateData(rolleId, this.endpointR,upgradeLevel).subscribe(data => {
        console.log('ny:',upgradeLevel.level);
        this.ngOnInit();
      })
  })
}
}