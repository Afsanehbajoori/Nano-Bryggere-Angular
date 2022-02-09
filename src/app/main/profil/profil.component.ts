import { RedigerBryggeriDialogBoxComponent } from './../rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { RedigerProfilDialogBoxComponent } from './../rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { Component, OnInit , Inject , ViewChild, Input } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { audit } from 'rxjs/operators';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThrowStmt } from '@angular/compiler';
import { FormBuilder } from '@angular/forms';






@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
  dialogRefSlet : MatDialogRef<SletDialogBoxComponent>;
  dialogRefRedigerProfil : MatDialogRef<RedigerProfilDialogBoxComponent>;
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
  kontaktoplysningerId : number=6;
  bryggeriId : number =4;
  dataLoaded : boolean=false;
  RedigerKontaktOplysninger: FormGroup = new FormGroup({});


  constructor(public dialog:MatDialog , public restApi: RestApiService , private router: Router , private snackBar : MatSnackBar , private formBuilder : FormBuilder ) { }


  ngOnInit(): void {
    this.dataLoaded= false;
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
      this.dialogRefSlet=this.dialog.open(SletDialogBoxComponent , {
        width:'300px',
        disableClose:false
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
      this.dialogRefRedigerProfil=this.dialog.open(RedigerProfilDialogBoxComponent , {
      disableClose:false
    });
      //view kontaktoplysninger
      this.restApi.getData(this.kontaktoplysningerId , this.endpointK)
      .toPromise()
      .then(data => {
        this.kontaktoplysningerList= data;
        //Object.assign(this.kontaktoplysningerList, data);
        console.log(this.kontaktoplysningerList);
        // build the edit form
        this.RedigerKontaktOplysninger = this.formBuilder.group({
          'FnavnCtl': new FormControl(this.kontaktoplysningerList.fnavn),
          'EnavnCtl': new FormControl(this.kontaktoplysningerList.enavn),
          'Add1Ctl':new FormControl(this.kontaktoplysningerList.addresselinje1),
          'Add2Ctl': new FormControl(this.kontaktoplysningerList.addresselinje2),
          'TelCtl':new FormControl(this.kontaktoplysningerList.telefonnr),
          'EmailCtl' : new FormControl(this.kontaktoplysningerList.email),
          'PostCtl' : new FormControl(this.kontaktoplysningerList.postnr),
          'ByCtl' : new FormControl(this.kontaktoplysningerList.by)
        })

      })

    /*   this.dialogRefRedigerProfil.afterClosed().subscribe(result => {
        if(result){
          this.restApi.updateData(this.kontaktoplysningerId , this.endpointK ).subscribe((data) => {
            this.kontaktoplysningerList=data;
            console.log(this.kontaktoplysningerList);
          })

      }
     }); */
    }



  sletBryggeri(){
      this.dialogRefSlet=this.dialog.open(SletDialogBoxComponent , {
        width:'300px',
        disableClose:false
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

  redigerBryggeri(){
      let dialogRef=this.dialog.open(RedigerBryggeriDialogBoxComponent);

      dialogRef.afterClosed().subscribe(result => {console.log('dialog result: ${result}');
    });
    }

}
