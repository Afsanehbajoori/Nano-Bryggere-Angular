import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-rediger-profil-dialog-box',
  templateUrl: './rediger-profil-dialog-box.component.html',
  styleUrls: ['./rediger-profil-dialog-box.component.css']
})
export class RedigerProfilDialogBoxComponent implements OnInit {
  redigerForm: FormGroup = new FormGroup({});
  kontaktOplysningsListe: any;
  brugerListe:any;
  kontaktoplysningId: number;
  brugerId:number;
  endpointK = '/KontaktOplysninger';
  endpointB= '/Bruger';

  constructor(public dialogRefUpdateProfile: MatDialogRef<RedigerProfilDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService
  ) { }

  ngOnInit(): void {
    this.kontaktoplysningId = JSON.parse(localStorage.getItem('kontaktOplysningerId') || '{}');
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.restApi.getData(this.kontaktoplysningId, this.endpointK)
      .toPromise()
      .then(data => {
        this.kontaktOplysningsListe = data;
/*
        this.restApi.getData(this.brugerId , this.endpointS).subscribe(res => {
          this.BrugerList=res; */
          // build the edit form
          this.redigerForm = this.formBuilder.group({
            fnavnCtl: new FormControl(this.kontaktOplysningsListe.fnavn),
            enavnCtl: new FormControl(this.kontaktOplysningsListe.enavn),
            adr1Ctl: new FormControl(this.kontaktOplysningsListe.adresseLinje1),
            adr2Ctl: new FormControl(this.kontaktOplysningsListe.adresseLinje2),
            telefonNrCtl: new FormControl(this.kontaktOplysningsListe.telefonNr),
            emailCtl: new FormControl(this.kontaktOplysningsListe.email),
            postNrCtl: new FormControl(this.kontaktOplysningsListe.postNr),
            byCtl: new FormControl(this.kontaktOplysningsListe.by),
           // BrugernavnCtl : new FormControl(this.BrugerList.brugernavn)
          });
        // })
      });
   }
  /*  onClose(){
     this.dialogRefRedigerProfil.close();
   } */
}