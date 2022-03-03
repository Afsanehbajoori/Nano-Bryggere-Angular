import { Component, OnInit } from '@angular/core';
import { MatDialog , MatDialogConfig ,MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { LoginSideComponent } from './../../login/login-side/login-side.component';


@Component({
  selector: 'app-rolle-admin-side',
  templateUrl: './rolle-admin-side.component.html',
  styleUrls: ['./rolle-admin-side.component.css']
})
export class RolleAdminSideComponent implements OnInit {
  searchkeyRollenavn:string;
  searchkeyBrugernavn:string;
  clickButton:boolean=true;
  endpointR='/Roller';
  endpoints='/Brugere';
  id = this.actRoute.snapshot.params['id'];
  users: Bruger[];
  rolleId:number;
  Rolle:any;
  level:number;



  constructor( public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadBruger();
  }

  loadBruger(){
    return this.restApi.getDatas(this.endpoints).subscribe((res) => {
        this.users = res;
        console.log(this.users);
      })
  }

  onVisBruger(id:any){
    this.clickButton=false;
    return this.restApi.getData(id , this.endpoints).subscribe((data) => {
      this.rolleId=data.rolleId;
      this.restApi.getData(this.rolleId ,this.endpointR ).subscribe((data) => {
        this.Rolle = data;

      })
    })

  }
  onFindBrugernavn(){
    if(this.searchkeyBrugernavn == ""){
      this.ngOnInit();
    }
   else{
    this.users = this.users.filter(res =>{
      return  res.brugernavn.toLowerCase().match(this.searchkeyBrugernavn.toLowerCase());
      })
    }
  }

  onFindRollenavn(){
    if(this.searchkeyRollenavn == ""){
      this.ngOnInit();
    }
   else{
      if(this.searchkeyRollenavn.toLowerCase() == 'anonymbruger')
      this.level=0 ;
      if(this.searchkeyRollenavn.toLowerCase() == 'bruger')
      this.level=100;
      if(this.searchkeyRollenavn.toLowerCase() == 'moderator')
      this.level=200;
      if(this.searchkeyRollenavn.toLowerCase() == 'administrator')
      this.level=300 ;
      this.restApi.getDataByLevel(this.level , this.endpoints).subscribe((data) => {
        return  this.users=data;
     })

    }
  }


  //husk at kigge på slet function
  onSletBruger(id:any){
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.restApi.deleteData(id , this.endpointR).subscribe((data) => {
          console.log('delete:' , id);
          this.loadBruger();
        })
      }

    });
  }


onNedgradereRollenavn(id:any){
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

onUpgradereRollenavn(id:any){

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
