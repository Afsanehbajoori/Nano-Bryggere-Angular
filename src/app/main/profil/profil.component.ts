import { RedigerBryggeriDialogBoxComponent } from './../rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { RedigerProfilDialogBoxComponent } from './../rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { Component, OnInit , Inject , ViewChild, Input } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig} from '@angular/material/dialog';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { audit, subscribeOn } from 'rxjs/operators';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThrowStmt } from '@angular/compiler';
import { FormBuilder } from '@angular/forms';
import { Injectable, ViewContainerRef } from '@angular/core';


@Injectable()


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  dialogRefSlet : MatDialogRef<SletDialogBoxComponent>;
  dialogRefRedigerProfil : MatDialogRef<RedigerProfilDialogBoxComponent>;
  dialogRefRedigerBryggeri : MatDialogRef<RedigerBryggeriDialogBoxComponent>;
  kontaktoplysningerList : any;
  bryggeriList : any;
  endpointK = '/Kontaktoplysninger';
  endpointB='/Bryggerier';
  showFillerP = false;
  showFillerB = false;
  showFillerOB = false;
  kontaktoplysningerId : number=40;
  bryggeriId : number=1 ;
  brugerId:number;
  @Input() newBryggeri={logo:'' , navn:'' , beskrivelse:''};
  opretteBryggeriForm : any= new FormGroup({});

  constructor(public dialog:MatDialog,
      public restApi: RestApiService ,
      private router: Router ,
      private snackBar : MatSnackBar ,
      private _formBuilder : FormBuilder,
      public actRoute: ActivatedRoute ) { }


  ngOnInit(): void {

    this.loadKontaktoplysninger();
    this.loadBryggeri();
    this.opretteBryggeriForm = this._formBuilder.group({
      'logo': new FormControl(''),
      'navn': new FormControl('' , Validators.required),
      'beskrivelse':new FormControl('')
    })

   /*  this.actRoute.params.subscribe(data => {
      console.log(data)
    }); */

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
      this.dialogRefSlet=this.dialog.open(SletDialogBoxComponent , {
        width:'300px',
        disableClose:true
      });
      this.dialogRefSlet.afterClosed().subscribe(result => {
      if(result){
      this.restApi.deleteData(this.kontaktoplysningerId , this.endpointK).subscribe((data) => {
        this.kontaktoplysningerList=data;
        this.snackBar.open("kontakt oplysninger slettet med succes");
        console.log(this.kontaktoplysningerList);
      } , err => {
        this.snackBar.open("Bruger skal slettes først");
      })
    }

  });

  }

 redigerProfil(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose= true;
  dialogConfig.autoFocus=true;
  dialogConfig.width="40%";
  this.dialogRefRedigerProfil=this.dialog.open(RedigerProfilDialogBoxComponent , dialogConfig);

  this.dialogRefRedigerProfil.afterClosed().subscribe(result => {
    if(result == true){
      this.kontaktoplysningerList= result;
      this.restApi.updateData(this.kontaktoplysningerId , this.endpointK , this.kontaktoplysningerList).subscribe((data) =>
      {
        console.log(this.kontaktoplysningerList);
      })
    }

});

}

redigerBryggeri(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose= true;
  dialogConfig.autoFocus=true;
  dialogConfig.width="40%";
  this.dialogRefRedigerBryggeri=this.dialog.open(RedigerBryggeriDialogBoxComponent , dialogConfig);

  this.dialogRefRedigerBryggeri.afterClosed().subscribe(result => {
    if(result){
      this.bryggeriList=result;
      this.restApi.updateData(this.bryggeriId , this .endpointB , this.bryggeriList).subscribe((data) =>
      {
        console.log(this.bryggeriList);
      })
    }

});
}



  sletBryggeri(){
      this.dialogRefSlet=this.dialog.open(SletDialogBoxComponent , {
        width:'300px',
        disableClose:true
      });
      this.dialogRefSlet.afterClosed().subscribe(result => {
        if(result){
        this.restApi.deleteData(this.bryggeriId , this.endpointB).subscribe((data) => {
        this.bryggeriList=data;
        this.snackBar.open("Bryggeri oplysninger slettet med succes");
        console.log(this.bryggeriList);
      }, err => {
        this.snackBar.open("Øl skal slettes først");
    })
  }

  });

    }


opretteBryggeri(){
  if(this.newBryggeri.navn != ''){
    this.restApi.createData(this.newBryggeri , this.endpointB).subscribe((data) => {
      if(data == true){
        console.log(data);
        this.snackBar.open('Oprette ny bryggei succed')
        this.onClose();
      }

    })
  }

    }


onClose(){
  this.opretteBryggeriForm.reset();
  this.router.navigate(['/main/profil']);
  this.showFillerOB = false;

    }



}
