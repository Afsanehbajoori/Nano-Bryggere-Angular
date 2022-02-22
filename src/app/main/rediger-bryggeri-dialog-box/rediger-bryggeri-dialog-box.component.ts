import { Component, OnInit } from '@angular/core';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { logging } from 'protractor';

@Component({
  selector: 'app-rediger-bryggeri-dialog-box',
  templateUrl: './rediger-bryggeri-dialog-box.component.html',
  styleUrls: ['./rediger-bryggeri-dialog-box.component.css']
})
export class RedigerBryggeriDialogBoxComponent implements OnInit {
  bryggeriList : any;
  endpointB='/Bryggerier';
  RedigerBryggeri:FormGroup = new FormGroup({});
  bryggeriId : number ;

  constructor(public dialogRefRedigerProfil : MatDialogRef<RedigerBryggeriDialogBoxComponent>,
    public restApi: RestApiService ,
    private router: Router ,
    private formBuilder: FormBuilder,
    private snackBar : MatSnackBar ) { }

  ngOnInit(): void {
    this.restApi.getData(this.bryggeriId , this.endpointB)
    .toPromise()
    .then(data => {
      this.bryggeriList = data;
      this.RedigerBryggeri=this.formBuilder.group({
        'logoCtl' : new FormControl(this.bryggeriList.logo),
        'navnCtl' : new FormControl(this.bryggeriList.navn),
        'beskrivelseCtl' : new FormControl(this.bryggeriList.beskrivelse)
      });
    })

  }



  onClose(){
    // this.dialogRefRedigerProfil.close();
    return this.router.navigate(['../main/profil']);
  }






}
