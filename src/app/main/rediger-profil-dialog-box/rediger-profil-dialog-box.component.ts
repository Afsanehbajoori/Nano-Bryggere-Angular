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
  updateForm: FormGroup = new FormGroup({});
  userInfoList: any;
  userList:any;
  userInfoId: number;
  userId:number;
  endpointK = '/Kontaktoplysninger';
  endpointB= '/Brugere';

  constructor(public dialogRefUpdateProfile: MatDialogRef<RedigerProfilDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService
  ) { }

  ngOnInit(): void {
    this.userInfoId = JSON.parse(localStorage.getItem('kontaktoplysningerId') || '{}');
    this.userId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.restApi.getData(this.userInfoId, this.endpointK)
      .toPromise()
      .then(data => {
        this.userInfoList = data;
/*
        this.restApi.getData(this.brugerId , this.endpointS).subscribe(res => {
          this.BrugerList=res; */

          // build the edit form
          this.updateForm = this.formBuilder.group({
            FnavnCtl: new FormControl(this.userInfoList.fnavn),
            EnavnCtl: new FormControl(this.userInfoList.enavn),
            Add1Ctl: new FormControl(this.userInfoList.addresselinje1),
            Add2Ctl: new FormControl(this.userInfoList.addresselinje2),
            TelCtl: new FormControl(this.userInfoList.telefonnr),
            EmailCtl: new FormControl(this.userInfoList.email),
            PostCtl: new FormControl(this.userInfoList.postnr),
            ByCtl: new FormControl(this.userInfoList.by),
           // BrugernavnCtl : new FormControl(this.BrugerList.brugernavn)
          });
        // })
      });
   }
  /*  onClose(){
     this.dialogRefRedigerProfil.close();
   } */

}
