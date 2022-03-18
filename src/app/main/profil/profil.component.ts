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

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  dialogRefDelete: MatDialogRef<SletDialogBoxComponent>;
  dialogRefUpdateProfile: MatDialogRef<RedigerProfilDialogBoxComponent>;
  dialogRefUpdateBrewery: MatDialogRef<RedigerBryggeriDialogBoxComponent>;
  userInfoList: any;
  userList:any;
  breweryList: any;
  roleList:any;
  endpointK = '/Kontaktoplysninger';
  endpointB = '/Bryggerier';
  endpointS= '/Brugere';
  endpointR= '/Roller';
  showFilesP = false;
  showFilesB = false;
  showFilesOB = false;
  userInfoId: number;
  breweryId: number;
  userId:number;
  roleId:number;
  choosenFile: File;
  showOB:boolean;
  logo:any;
  url: string;
  @Input() newBrewery = { logo: '', navn: '', beskrivelse: '', kontaktoplysningerId: 0 };
  breweryCreationForm: any = new FormGroup({});

  constructor(public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userInfoId = JSON.parse(localStorage.getItem('kontaktoplysningerId') || '{}');
    this.userId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.roleId = JSON.parse(localStorage.getItem('rolleId') || '{}');
    console.log("brugerId:",this.userId)
    console.log("brugerId:",this.userInfoId)
    this.onloadUserInformation();
    this.onloadBrewery();

    this.breweryCreationForm = this._formBuilder.group({
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

  onloadUserInformation() {
    return this.restApi.getData(this.userId, this.endpointS).subscribe((data) => {
      this.userList = data;
      console.log("brugernavn:", this.userList.rolleId);
      this.restApi.getData( this.userInfoId, this.endpointK).subscribe((data) => {
        this.userInfoList = data;
        console.log("konId" , this.userInfoId);
        console.log(" this.kontaktoplysningerList:", this.userInfoList.enavn);
        this.restApi.getData(this.roleId , this.endpointR).subscribe((data) => {
          this.roleList=data;
          console.log('RolleList' , this.roleList)
        })
      })
    })
  };

  onloadBrewery() {
    this.restApi.getDatas(this.endpointB).subscribe((data) => {
    this.breweryList = data.find((x:any) => x.kontaktoplysningerId === this.userInfoId);
    console.log('this.bryggeri:',this.breweryList);
    //console.log('id:',this.bryggeriList.id);
    if(this.breweryList !== undefined){
      localStorage.setItem('bryggeriId' , JSON.stringify(this.breweryList.id));
      this.url=this.breweryList.logo;
      this.showOB=false;
      console.log(this.showOB);
    }
    else{
       this.showOB=true;
       console.log(this.showOB);
    }
    })
  }

  onSubmitCertificate(event: any) {
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

  onCreateBrewery() {
    if (this.newBrewery.navn != '') {
    console.log("test:", this.userInfoId);
    this.newBrewery.kontaktoplysningerId = this.userInfoId;
    console.log("kontaktoplysningerId:" ,  this.newBrewery.kontaktoplysningerId);
    this.newBrewery.logo = JSON.parse(localStorage.getItem('logo') || '{}');
    this.restApi.createData(this.newBrewery, this.endpointB).subscribe((data) => {
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

  onDeleteProfile() {
    this.dialogRefDelete = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(this.userInfoId, this.endpointK).subscribe((data) => {
          this.userInfoList = data;
          this.snackBar.open("kontakt oplysninger slettet med succes");
        }, err => {
          this.snackBar.open("Bruger skal slettes først");
        })
      }
    });
  }

  onUpdateProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefUpdateProfile = this.dialog.open(RedigerProfilDialogBoxComponent, dialogConfig);
    this.dialogRefUpdateProfile.afterClosed().subscribe(result => {
      if (result) {
        this.userInfoList = result;
        this.restApi.updateData(this.userInfoId, this.endpointK, this.userInfoList).subscribe((data) => {
          console.log(this.userInfoList);
        })
      }
    });
  }

  onUpdateBrewery() {
    this.breweryId=JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialogRefUpdateBrewery = this.dialog.open(RedigerBryggeriDialogBoxComponent, dialogConfig);
    this.dialogRefUpdateBrewery.afterClosed().subscribe(result => {
      if (result) {
        this.breweryList = result;
        this.restApi.updateData(this.breweryId, this.endpointB, this.breweryList).subscribe((data) => {
          this.ngOnInit();
        })
      }
    });
  }

  onDeleteBrewery() {
    this.dialogRefDelete = this.dialog.open(SletDialogBoxComponent, {
      width: '300px',
      disableClose: true
    });
    this.dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.restApi.deleteData(this.breweryId, this.endpointB).subscribe((data) => {
          this.breweryList = data;
          this.snackBar.open("Bryggeri oplysninger slettet med succes");
        }, err => {
          this.snackBar.open("Øl skal slettes først");
        })
      }
    });
  }

  onClose() {
    this.breweryCreationForm.reset();
    this.router.navigate(['/main/profil']);
    this.showFilesOB = false;
  }

  onUploadCertificate() {
    const fd = new FormData();
    this.restApi.updateData(this.breweryId, this.endpointB, this.breweryList).subscribe((data) => {
      console.log(this.breweryList);
    })
  };
}