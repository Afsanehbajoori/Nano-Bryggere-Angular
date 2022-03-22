import { Component, OnInit } from '@angular/core';
import { Brewery } from 'src/app/Models/Brewery';
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
  breweryList : any;
  endpointB='/Breweries';
  updateForm:FormGroup = new FormGroup({});
  breweryId : number ;

  constructor(public dialogRefUpdateProfil : MatDialogRef<RedigerBryggeriDialogBoxComponent>,
    public restApi: RestApiService ,
    private router: Router ,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.breweryId=JSON.parse(localStorage.getItem('breweryId') || '{}');
    this.restApi.getData(this.breweryId , this.endpointB)
    .toPromise()
    .then(data => {
      this.breweryList = data;
      this.updateForm=this.formBuilder.group({
        'logoCtl' : new FormControl(this.breweryList.logo),
        'nameCtl' : new FormControl(this.breweryList.name),
        'descriptionCtl' : new FormControl(this.breweryList.description)
      });
    })

  }

  onSubmitCertifikats(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.breweryList.logo =e.target.result;
        console.log( this.breweryList.logo);
        localStorage.setItem('logo' ,JSON.stringify(this.breweryList.logo));
      }
    }
  };

  onClose(){
    // this.dialogRefRedigerProfil.close();
    return this.router.navigate(['../main/profile']);
  }
}