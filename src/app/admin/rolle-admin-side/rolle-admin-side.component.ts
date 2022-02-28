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
  searchkeyRollenavn:string;
  clickButton:boolean=true;
  endpointR='/Roller';
  endpoints='/Brugere';
  id = this.actRoute.snapshot.params['id'];
  users: Bruger[];
  rolleId:number;
  Rolle:any;



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


  onFindRollenavn(){

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


}

onUpgradereRollenavn(id:any){

}



}
