import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestApiService } from 'src/app/shared/rest-api.service';



@Component({
  selector: 'app-rediger-profil-dialog-box',
  templateUrl: './rediger-profil-dialog-box.component.html',
  styleUrls: ['./rediger-profil-dialog-box.component.css']
})
export class RedigerProfilDialogBoxComponent implements OnInit {
  RedigerKontaktOplysninger: FormGroup = new FormGroup({});
  kontaktoplysningerList : any;
  kontaktoplysningerId :number;
  endpointK = '/Kontaktoplysninger';

  constructor( public dialogRefRedigerProfil : MatDialogRef<RedigerProfilDialogBoxComponent> ,
    private formBuilder : FormBuilder ,
    public restApi: RestApiService
   ) { }

  ngOnInit(): void {


    this.restApi.getData(this.kontaktoplysningerId , this.endpointK)
      .toPromise()
      .then(data => {
        this.kontaktoplysningerList= data;
         // build the edit form
        this.RedigerKontaktOplysninger = this.formBuilder.group({
          'FnavnCtl': new FormControl(this.kontaktoplysningerList.fnavn),
          'EnavnCtl': new FormControl(this.kontaktoplysningerList.enavn),
          'Add1Ctl':new FormControl(this.kontaktoplysningerList.addresselinje1),
          'Add2Ctl': new FormControl(this.kontaktoplysningerList.addresselinje2),
          'TelCtl':new FormControl(this.kontaktoplysningerList.telefonnr),
          'EmailCtl' : new FormControl(this.kontaktoplysningerList.email),
          'PostCtl' : new FormControl(this.kontaktoplysningerList.postnr),
          'ByCtl': new FormControl(this.kontaktoplysningerList.by)
        });


      })
   }



 /*  onClose(){
    this.dialogRefRedigerProfil.close();
  } */



}
