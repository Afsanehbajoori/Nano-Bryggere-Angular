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
// import { HttpEventType } from '@angular/common/http';

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
  kontaktoplysningerList: any;
  bryggeriList: any;
  endpointK = '/Kontaktoplysninger';
  endpointB = '/Bryggerier';
  showFillerP = false;
  showFillerB = false;
  showFillerOB = false;
  showOB = false;
  kontaktoplysningerId: number;
  bryggeriId: number;
  valgtefil: File;
  url : string = "assets/images/Gromit Mug.jpg";
  public show : number;

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
    this.loadKontaktoplysninger();
    this.loadBryggeri();
    this.opretteBryggeriForm = this._formBuilder.group({
      'logo': new FormControl(''),
      'navn': new FormControl('', Validators.required),
      'beskrivelse': new FormControl(''),
      'kontaktoplysningerId': new FormControl('')
    })
  }

  opretteBryggeri() {
    if (this.newBryggeri.navn != '') {
      this.newBryggeri.kontaktoplysningerId = this.kontaktoplysningerId;
      this.restApi.createData(this.newBryggeri, this.endpointB).subscribe((data) => {
        console.log("bryggeriId:", data.id);
        console.log("bryggeri:", data)
        localStorage.setItem('bryggeriId', JSON.stringify(data.id));
        this.loadBryggeri();
        if (data) {
          this.snackBar.open('Oprette ny bryggei succed')
          this.onClose();
        }
      })
    }
  }

  loadKontaktoplysninger() {
    return this.restApi.getData(this.kontaktoplysningerId, this.endpointK).subscribe((data) => {
      this.kontaktoplysningerList = data;
      //console.log("kontaktoplysningerList:", this.kontaktoplysningerList);
    })
  };

  loadBryggeri() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {

      this.restApi.getData(this.bryggeriId, this.endpointB).subscribe((data) => {
        this.bryggeriList = data;
        if(this.bryggeriList.kontaktoplysningerId == this.kontaktoplysningerId)
        {
          this.show = 1;
          console.log(this.show);
        }
        else{
          this.show = 0;
          console.log(this.show);
        }       
        //console.log("bryggeriList",this.bryggeriList);
      })
    }
    return true;
  };

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
          // console.log(this.kontaktoplysningerList);
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
      if (result == true) {
        this.kontaktoplysningerList = result;
        this.restApi.updateData(this.kontaktoplysningerId, this.endpointK, this.kontaktoplysningerList).subscribe((data) => {
          console.log(this.kontaktoplysningerList);
        })
      }
    });
  }

  redigerBryggeri() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefRedigerBryggeri = this.dialog.open(RedigerBryggeriDialogBoxComponent, dialogConfig);

    this.dialogRefRedigerBryggeri.afterClosed().subscribe(result => {
      if (result) {
        this.bryggeriList = result;
        this.restApi.updateData(this.bryggeriId, this.endpointB, this.bryggeriList).subscribe((data) => {
          // console.log(this.bryggeriList);
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
          // console.log(this.bryggeriList);
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
  onSubmitCertifikats(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.bryggeriList.logo =e.target.result;
      }
    }
  };

  onUploadCertifikat() {
    const fd = new FormData();
    // if(this.bruger.certifikat == null){}
    this.restApi.updateData(this.bryggeriId, this.endpointB, this.bryggeriList).subscribe((data) => {
      console.log(this.bryggeriList);
    })
    // fd.append('image', this.valgtefil, this.valgtefil.name)
    // this.restApi.updateData(this.kontaktoplysningerId, this.endpointB, fd)
    // .subscribe(res => {
    //   console.log(res);
    //   if(res.type == HttpEventType.UploadProgress){
    //     console.log('Upload Progress: ' + Math.round(res.loaded / res.total * 100) + '%');
    //   } else if(res.type === HttpEventType.Response){
    //     console.log(res);
    //   }
    // });
  };
}