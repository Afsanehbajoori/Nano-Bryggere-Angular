import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { KontaktOplysninger } from 'src/app/Models/KontaktOplysninger';
import { RedigerProfilDialogBoxComponent } from 'src/app/main/rediger-profil-dialog-box/rediger-profil-dialog-box.component';

@Component({
  selector: 'app-bruger-admin-side',
  templateUrl: './bruger-admin-side.component.html',
  styleUrls: ['./bruger-admin-side.component.css']
})

export class BrugerAdminSideComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefOpdaterProfil: MatDialogRef<RedigerProfilDialogBoxComponent>;
  brugere: Bruger[];
  bruger = new Bruger();
  endpointB = '/Bruger'; //endpointB
  endpointK = '/KontaktOplysninger'; //endpointK
  searchkeyBrugernavn: string;
  searchkeyBrugerEnavn: string;
  searchkeyEmail: string;
  searchkeyEventsTitel: string;
  kontaktOplysninger: any; //kontaktoplysninger
  certifikat: any;
  id = this.actRoute.snapshot.params['id'];
  kontaktOplysningerId: number; //kontaktoplysningerId
  clickButton: boolean = true;
  kontaktOplysningsListe: any; //kontaktoplysningerList
  oplysningsListe: KontaktOplysninger[]; //kontakt

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentBruger();
  }

  onHentBruger() {
    return this.restApi.getDatas(this.endpointB).subscribe((res) => {
      this.brugere = res;
      // console.log(this.brugere);
    })
  }

  onVisBruger(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointB).subscribe((data) => {
      this.kontaktOplysningerId = data.kontaktOplysningerId;
      this.restApi.getData(this.kontaktOplysningerId, this.endpointK).subscribe((data) => {
        this.kontaktOplysninger = data;
      })
    })
  }

  onFindBrugernavn() {
    if (this.searchkeyBrugernavn == "") {
      this.ngOnInit();
    }
    else {
      this.brugere = this.brugere.filter(res => {
        return res.brugernavn.toLowerCase().match(this.searchkeyBrugernavn.toLowerCase());
      })
    }
  }

  onFindBrugerEnavn() {
    if (this.searchkeyBrugerEnavn == '') {
      this.ngOnInit();
    }
    else {
      this.restApi.getDataByEnavn(this.searchkeyBrugerEnavn, this.endpointB).subscribe((data) => {
        return this.brugere = data;
      })
    }
  }

  onFindEmail() {
    if (this.searchkeyEmail == "") {
      this.ngOnInit();
    }
    else {
      this.restApi.getDataByEmail(this.searchkeyEmail, this.endpointB).subscribe((data) => {
        return this.brugere = data;
      })
    }
  }

  onFindBrugernavnByEventsTitel() {
    if (this.searchkeyEventsTitel == "") {
      this.ngOnInit();
    }
    else {
      this.restApi.getUserByEventsTitle(this.searchkeyEventsTitel, this.endpointB).subscribe((data) => {
        return this.brugere = data;
      })
    }
  }

  //husk at kigge på slet bruger , kan ikke sltettes før slet deltager og login
  onSletBruger(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      /* this.restApi.getData(id , this.endpoints).subscribe((data) => {
        this.kontaktoplysningerId= data.kontaktoplysningerId;
        console.log("kontId:",this.kontaktoplysningerId);
        this.restApi.deleteData(this.kontaktoplysningerId, this.endpointK).subscribe(data => {
          this.loadBruger();
        })
      })*/
      if (result) {
        this.restApi.deleteData(id, this.endpointB).subscribe((data) => {
          // console.log('delete:', id);
          this.onHentBruger();
        })
      }
    });
  }

  onOpdaterBruger(id: any) {
    // console.log('id', id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.restApi.getData(id, this.endpointB).subscribe((data) => {
      this.kontaktOplysningerId = data.kontaktOplysningerId;
      // console.log("kontId:", this.kontaktOplysningerId);
      localStorage.setItem('KontaktOplysningerId', this.kontaktOplysningerId.toString());
      this.dialogRefOpdaterProfil = this.dialog.open(RedigerProfilDialogBoxComponent, dialogConfig);
      this.dialogRefOpdaterProfil.afterClosed().subscribe(result => {
        if (result) {
          this.oplysningsListe = result;
          this.restApi.updateData(this.kontaktOplysningerId, this.endpointK, this.oplysningsListe).subscribe((data) => {
            // console.log(this.oplysningsListe);
            this.onVisBruger(id);
          })
        }
      });
    })
  };
}