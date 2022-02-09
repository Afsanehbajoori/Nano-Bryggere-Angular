import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-rediger-profil-dialog-box',
  templateUrl: './rediger-profil-dialog-box.component.html',
  styleUrls: ['./rediger-profil-dialog-box.component.css']
})
export class RedigerProfilDialogBoxComponent implements OnInit {
  RedigerKontaktOplysninger: FormGroup = new FormGroup({});
  kontaktoplysningerList : any;
  
  constructor( public dialogRefRedigerProfil : MatDialogRef<RedigerProfilDialogBoxComponent> , private formBuilder : FormBuilder) { }

  ngOnInit(): void {

   }

  updateKontaktOplysninger(){

  console.log(this.RedigerKontaktOplysninger.value);
  }
}
