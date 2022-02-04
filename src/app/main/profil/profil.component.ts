import { Component, OnInit , Inject , ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {

  showFillerP = false;
  showFillerB = false;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor() { }


  ngOnInit(): void {

  }

  sletProfil(){
  /*   const dialogRef = this.dialog.open(bekræfteSide);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); */

  }
  redigerProfil(){

  }
  sletBryggeri(){

  }
  redigerBryggeri(){

  }

}
