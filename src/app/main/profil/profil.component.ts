import { RedigerBryggeriDialogBoxComponent } from './../rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { RedigerProfilDialogBoxComponent } from './../rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { Component, OnInit , Inject , ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {

  showFillerP = false;
  showFillerB = false;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(public dialog:MatDialog) { }


  ngOnInit(): void {

  }

  sletProfil() {
    let dialogRef=this.dialog.open(SletDialogBoxComponent);

    dialogRef.afterClosed().subscribe(result => {console.log('dialog result: ${result}');
  });

  }

  redigerProfil(){
    let dialogRef=this.dialog.open(RedigerProfilDialogBoxComponent);

    dialogRef.afterClosed().subscribe(result => {console.log('dialog result: ${result}');
  });
  }

  sletBryggeri(){
    this.dialog.open(SletDialogBoxComponent);
  }

  redigerBryggeri(){
    let dialogRef=this.dialog.open(RedigerBryggeriDialogBoxComponent);

    dialogRef.afterClosed().subscribe(result => {console.log('dialog result: ${result}');
  });
  }

}
