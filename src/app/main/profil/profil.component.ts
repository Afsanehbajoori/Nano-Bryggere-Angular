import { RedigerBryggeriDialogBoxComponent } from '../update-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { RedigerProfilDialogBoxComponent } from '../update-profil-dialog-box/rediger-profil-dialog-box.component';
import { Component, OnInit, Inject, ViewChild, Input, EventEmitter } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { SletDialogBoxComponent } from '../delete-dialog-box/slet-dialog-box.component';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefRedigerProfil: MatDialogRef<RedigerProfilDialogBoxComponent>;
  dialogRefRedigerBryggeri: MatDialogRef<RedigerBryggeriDialogBoxComponent>;
  kontaktoplysningerList: any ;
  BrugerList:any;
  bryggeriList: any;
  RolleList:any;
  endpointK = '/Kontaktoplysninger';
  endpointB = '/Bryggerier';
  endpointS= '/Brugere';
  endpointR= '/Roller';
  showFillerP = false;
  showFillerB = false;
  showFillerOB = false;
  kontaktoplysningerId: number;
  bryggeriId: number;
  brugerId:number;
  rolleId:number;
  valgtefil: File;
  showOB:boolean ;
  logo:any;
  url: string;
  @Input() newBryggeri = { logo: '', navn: '', beskrivelse: '', kontaktoplysningerId: 0 };
  opretteBryggeriForm: any = new FormGroup({});

  constructor(public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.kontaktoplysningerId = JSON.parse(localStorage.getItem('kontaktoplysningerId') || '{}');
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.rolleId = JSON.parse(localStorage.getItem('rolleId') || '{}');
    console.log("brugerId:",this.brugerId)
    console.log("brugerId:",this.kontaktoplysningerId)
    this.loadKontaktoplysninger();
    this.loadBryggeri();

    this.opretteBryggeriForm = this._formBuilder.group({
      'logo': new FormControl(''),
      'navn': new FormControl('', Validators.required),
      'beskrivelse': new FormControl(''),
      'kontaktoplysningerId': new FormControl('')
    })
  }

  //vi skal kigge på logud
 /*  logud(){
    localStorage.clear();
    this.router.navigate(["../login/login"]);
  }  */

  loadKontaktoplysninger() {
    return this.restApi.getData(this.brugerId, this.endpointS).subscribe((data) => {
      this.BrugerList = data;
      console.log("brugernavn:", this.BrugerList.rolleId);
      this.restApi.getData( this.kontaktoplysningerId, this.endpointK).subscribe((data) => {
        this.kontaktoplysningerList = data;
        console.log("konId" , this.kontaktoplysningerId);
        console.log(" this.kontaktoplysningerList:", this.kontaktoplysningerList.enavn);
        this.restApi.getData(this.rolleId , this.endpointR).subscribe((data) => {
          this.RolleList=data;
          console.log('RolleList' , this.RolleList)
        })
      })
    })
  };

  loadBryggeri() {
    this.restApi.getDatas(this.endpointB).subscribe((data) => {
    this.bryggeriList = data.find((x:any) => x.kontaktoplysningerId === this.kontaktoplysningerId);
    console.log('this.bryggeri:',this.bryggeriList);
    //console.log('id:',this.bryggeriList.id);
    if(this.bryggeriList !== undefined){
      localStorage.setItem('bryggeriId' , JSON.stringify(this.bryggeriList.id));
      this.url=this.bryggeriList.logo;
      this.showOB=false;
      console.log(this.showOB);
    }
    else{
       this.showOB=true;
       console.log(this.showOB);
    }
    })
  }

  onSubmitCertifikats(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.logo = e.target.result;
        console.log(this.logo);
        localStorage.setItem('logo', JSON.stringify(this.logo));
      }
    }
  };

  opretteBryggeri() {
    if (this.newBryggeri.navn != '') {
    console.log("test:", this.kontaktoplysningerId);
    this.newBryggeri.kontaktoplysningerId = this.kontaktoplysningerId;
    console.log("kontaktoplysningerId:" ,  this.newBryggeri.kontaktoplysningerId);
    this.newBryggeri.logo = JSON.parse(localStorage.getItem('logo') || '{}');
    this.restApi.createData(this.newBryggeri, this.endpointB).subscribe((data) => {
      localStorage.setItem('bryggeriId', JSON.stringify(data.id));
      this.ngOnInit();
      if (data) {
        this.showOB=false;
        this.snackBar.open('Oprette ny bryggei succed')
        this.onClose();
      }
    })
    }
  }

  sletProfil() {
    this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefSlet.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(this.kontaktoplysningerId, this.endpointK).subscribe((data) => {
          this.kontaktoplysningerList = data;
          this.snackBar.open("kontakt oplysninger slettet med succes");
        }, err => {
          this.snackBar.open("Bruger skal slettes først");
        })
      }
    });
  }

  redigerProfil() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefRedigerProfil = this.dialog.open(RedigerProfilDialogBoxComponent, dialogConfig);
    this.dialogRefRedigerProfil.afterClosed().subscribe(result => {
      if (result) {
        this.kontaktoplysningerList = result;
        this.restApi.updateData(this.kontaktoplysningerId, this.endpointK, this.kontaktoplysningerList).subscribe((data) => {
          console.log(this.kontaktoplysningerList);
        })
      }
    });
  }

  redigerBryggeri() {
    this.bryggeriId=JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefRedigerBryggeri = this.dialog.open(RedigerBryggeriDialogBoxComponent, dialogConfig);
    this.dialogRefRedigerBryggeri.afterClosed().subscribe(result => {
      if (result) {
        this.bryggeriList = result;
        this.restApi.updateData(this.bryggeriId, this.endpointB, this.bryggeriList).subscribe((data) => {
          this.ngOnInit();
        })
      }
    });
  }

  sletBryggeri() {
    this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefSlet.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(this.bryggeriId, this.endpointB).subscribe((data) => {
          this.bryggeriList = data;
          this.snackBar.open("Bryggeri oplysninger slettet med succes");
        }, err => {
          this.snackBar.open("Øl skal slettes først");
        })
      }
    });
  }

  onClose() {
    this.opretteBryggeriForm.reset();
    this.router.navigate(['/main/profil']);
    this.showFillerOB = false;
  }

  onUploadCertifikat() {
    const fd = new FormData();
    this.restApi.updateData(this.bryggeriId, this.endpointB, this.bryggeriList).subscribe((data) => {
      console.log(this.bryggeriList);
    })
  };
}