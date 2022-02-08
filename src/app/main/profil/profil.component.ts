import { RedigerBryggeriDialogBoxComponent } from './../rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { RedigerProfilDialogBoxComponent } from './../rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { Component, OnInit , Inject , ViewChild, Input } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Kontaktolysninger } from 'src/app/Models/Kontaktoplysninger';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';






@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  //kontaktoplysningerList: Kontaktolysninger[] ;
  kontaktoplysningerList : any;
  //kontaktoplysning= new Kontaktolysninger();
  bryggeriList : any;
  //bryggeri = new Bryggeri;
  endpointK = '/Kontaktoplysninger';
  endpointB='/Bryggerier';
  showFillerP = false;
  showFillerB = false;
  kontaktoplysningerId : number=2;
  bryggeriId : number =1;

  constructor(public dialog:MatDialog , public restApi: RestApiService , private router: Router  ) { }


  ngOnInit(): void {

    this.loadKontaktoplysninger();
    this.loadBryggeri();


  }

  loadKontaktoplysninger(){

    return this.restApi.getData(this.kontaktoplysningerId ,  this.endpointK).subscribe((data) => {
      this.kontaktoplysningerList = data  ;
      console.log(this.kontaktoplysningerList);
    })
  };



  loadBryggeri(){
  return this.restApi.getData(this.bryggeriId ,this.endpointB).subscribe((data) => {
      this.bryggeriList = data;
      console.log(this.bryggeriList);
  })
};

  sletProfil() {
    let dialogRef=this.dialog.open(SletDialogBoxComponent);

    dialogRef.afterClosed().subscribe(result => {console.log(result);
  });

  }

  redigerProfil(){
    let dialogRef=this.dialog.open(RedigerProfilDialogBoxComponent);

    dialogRef.afterClosed().subscribe(result => {console.log('dialog result: ${result}');
  });
  }

  sletBryggeri(){
    let dialogRef =this.dialog.open(SletDialogBoxComponent);
    /* dialogRef.afterClosed().subscribe(result =>
      {
        if(result){
          this.restApi.deleteData(id , this.endpointB);

        }
      }
      ) */

  }

  redigerBryggeri(){
    let dialogRef=this.dialog.open(RedigerBryggeriDialogBoxComponent);

    dialogRef.afterClosed().subscribe(result => {console.log('dialog result: ${result}');
  });
  }

}
