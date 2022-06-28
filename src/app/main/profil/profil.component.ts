import { RedigerBryggeriDialogBoxComponent } from './../rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { RedigerProfilDialogBoxComponent } from './../rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { Component, OnInit, Inject, ViewChild, Input, EventEmitter } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { JsonpClientBackend } from '@angular/common/http';

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
  kontaktOplysningsListe: any;
  brugerListe: any;
  bryggeriListe: any;
  rolleListe: any;
  endpointK = '/KontaktOplysninger';
  endpointB = '/Bryggerier';
  endpointBru = '/Bruger';
  endpointR = '/Rolle';
  visFillerP = false;
  visFillerB = false;
  visFillerOB = false;
  kontaktOplysningerId: number;
  bryggeriId: number;
  olId:number;
  brugerId: number;
  rolleId: number;
  chosenFile: File;
  visOB: boolean;
  visB: boolean;
  bryggeriLogo: any;
  url: string;
  rolleNavn:string;
  endpoints = '/Øller';
  olListe: any;
  @Input() nytBryggeri = { bryggeriLogo: '', navn: '', beskrivelse: '', kontaktOplysningerId: 0 };
  bryggeriOprettelsesForm: any = new FormGroup({});

  constructor(public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.kontaktOplysningerId = JSON.parse(localStorage.getItem('kontaktOplysningerId') || '{}');
    console.log("id",this.kontaktOplysningerId);
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.rolleId = JSON.parse(localStorage.getItem('rolleId') || '{}');
    this.olId = JSON.parse(localStorage.getItem('olId') || '{}');
    this.onHentBryggeri();          
    this.onHentBruger();
    this.onHentOl();
    this.visOB = false;
    this.visB = true;
    this.bryggeriOprettelsesForm = this._formBuilder.group({
      'bryggeriLogo': new FormControl(''),
      'navn': new FormControl('', Validators.required),
      'beskrivelse': new FormControl(''),
      'kontaktOplysningerId': new FormControl('')
    });
  }
  //vi skal kigge på logud
  /*  logud(){
     localStorage.clear();
     this.router.navigate(["../login/login"]);
   }  */

   onHentOl(){
    return this.restApi.getData(this.olId, this.endpoints).subscribe((beer: {}) => {
      this.olListe = beer;
      console.log("øl:" , this.olListe.id);
      
    });
  }
  onHentBruger() {
    return this.restApi.getData(this.brugerId, this.endpointBru).subscribe((brugerData) => {
      this.brugerListe = brugerData;
      this.restApi.getData(this.kontaktOplysningerId, this.endpointK).subscribe((kontaktData) => {
        this.kontaktOplysningsListe = kontaktData;
        this.restApi.getData(this.rolleId, this.endpointR).subscribe((rolleData) => {
          this.rolleListe = rolleData;
          if(this.rolleListe.rolleNavn == 300){
            this.rolleNavn = 'Administrator'
          }
          if(this.rolleListe.rolleNavn == 200){
            this.rolleNavn = 'Moderator'
          }
          if(this.rolleListe.rolleNavn == 100){
            this.rolleNavn = 'Bruger'
          }
          if(this.rolleListe.rolleNavn == 0){
            this.rolleNavn = 'Anonymbruger'
          }
          this.onTjekCertifikat();
        })
      })
    })
  };
  onTjekCertifikat() {
    // this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    if (this.brugerListe.certifikatStatus == 3) {
      // this.restApi.getDatas(this.endpointB).subscribe((bryggeri) => {
      //   this.bryggeriListe = bryggeri.find((x: any) => x.kontaktOplysningerId === this.kontaktOplysningerId);
        // if (typeof(this.bryggeriId) !== 'undefined' || typeof(this.bryggeriId !== '{}')){
        if(localStorage.getItem('bryggeriId') !== null){
          this.visOB = true;
          this.visB = false;
        }
        else {
          this.visOB = false;
        }
      // })
    }
    else {
      this.visOB = true;
    }
  }

  onHentBryggeri() {
    this.restApi.getDatas(this.endpointB).subscribe((data) => {
      this.bryggeriListe = data.find((x: any) => x.kontaktOplysningerId === this.kontaktOplysningerId);
      
      if (this.bryggeriListe !== undefined) {
        
        localStorage.setItem('bryggeriId', JSON.stringify(this.bryggeriListe.id));
        this.url = this.bryggeriListe.bryggeriLogo;
        // this.visOB = true;
        // this.visB = false;
      }
    })
  }

  onSubmitProfilBilled(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.bryggeriLogo = e.target.result;
        localStorage.setItem('bryggeriLogo', JSON.stringify(this.bryggeriLogo));
      }
    }
  };

  onOpretBryggeri() {
    if (this.nytBryggeri.navn != '') {
      this.nytBryggeri.kontaktOplysningerId = this.kontaktOplysningerId;
      this.nytBryggeri.bryggeriLogo = JSON.parse(localStorage.getItem('bryggeriLogo') || '{}');
      this.restApi.createData(this.nytBryggeri, this.endpointB).subscribe((data) => {
        localStorage.setItem('bryggeriId', JSON.stringify(data.id));
        if (data) {
          this.visOB = true;
          this.visB = false;
          this.snackBar.open('Nyt bryggeri oprettet')
          this.ngOnInit();
          this.onClose();
        }
      })
    }
  }

  onSletProfil() {
    this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefSlet.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(this.kontaktOplysningerId, this.endpointK).subscribe((data) => {
          this.restApi.deleteData(this.brugerId, this.endpointBru).subscribe((data) => {
            if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
              this.restApi.deleteData(this.bryggeriId, this.endpointB).subscribe((data) => {
              })
            }
          })
          this.snackBar.open("kontakt oplysninger slettet med succes");
        }, err => {
          this.snackBar.open("Bruger skal slettes først");
        })
      }
    });
  }

  onOpdaterProfil() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefRedigerProfil = this.dialog.open(RedigerProfilDialogBoxComponent, dialogConfig);
    this.dialogRefRedigerProfil.afterClosed().subscribe(result => {
      if (result) {
        this.kontaktOplysningsListe = result;
        this.restApi.updateData(this.kontaktOplysningerId, this.endpointK, this.kontaktOplysningsListe).subscribe((data) => {
          this.ngOnInit();
        })
      }
    });
  }

  onOpdaterBryggeri() {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefRedigerBryggeri = this.dialog.open(RedigerBryggeriDialogBoxComponent, dialogConfig);
    this.dialogRefRedigerBryggeri.afterClosed().subscribe(result => {
      if (result) {
        this.bryggeriListe = result;
        this.restApi.updateData(this.bryggeriId, this.endpointB, this.bryggeriListe).subscribe((data) => {
          this.ngOnInit();
        })
      }
    });
  }

  onSletBryggeri() {
    this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefSlet.afterClosed().subscribe(result => {
      if (result) {
        if(this.olListe.id === null){
          
        }
        this.restApi.deleteData(this.bryggeriId, this.endpointB).subscribe((data) => {
        this.bryggeriListe = data;
        console.log("exist:" , this.bryggeriListe);
          
        this.snackBar.open("Bryggeri oplysninger slettet med succes");
          //localStorage.clear();
          this.ngOnInit();
        }, err => {
          this.snackBar.open("Øl skal slettes først");
        })
      }
    });
  }

  onClose() {
    this.bryggeriOprettelsesForm.reset();
    this.router.navigate(['/main/profil']);
    this.visFillerOB = false;
  }

  onUploadProfilBilled() {
    const fd = new FormData();
    this.restApi.updateData(this.bryggeriId, this.endpointB, this.bryggeriListe).subscribe((data) => {
    })
  };
}