import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RedigerProfilDialogBoxComponent } from 'src/app/main/rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { KontaktOplysninger } from 'src/app/Models/KontaktOplysninger';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-bruger-certifikat',
  templateUrl: './bruger-certifikat.component.html',
  styleUrls: ['./bruger-certifikat.component.css']
})
export class BrugerCertifikatComponent implements OnInit {
  kontaktOplysningsListe: KontaktOplysninger[]; //oplysninger
  kontaktOplysninger: KontaktOplysninger;
  certifikatListe: any;
  certifikat: Bruger; //oplysninger
  kontaktOplysningerId: number;
  endpointK = '/KontaktOplysninger';
  endpointB = '/Bruger';
  clickButton: boolean = true;
  searchkey: string;
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefOpdaterProfil: MatDialogRef<RedigerProfilDialogBoxComponent>;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentBrugerCertifikat();
  }

  onHentBrugerCertifikat() {
    return this.restApi.getDatas(this.endpointB).subscribe((certifikatData) => {
      this.certifikatListe = certifikatData.filter((a: any) => {
        return a.certifikatStatus === 2;
      });
      this.restApi.getDatas(this.endpointK).subscribe((kontaktOplysningerData) => {
        // this.kontaktOplysningsListe = kontaktOplysningerData;
        this.kontaktOplysningsListe = kontaktOplysningerData.filter((a: any) => {
          return a.id === this.certifikatListe.kontaktOplysningerId;
        });
        // console.log(this.kontaktOplysningsListe);
        // console.log(this.certifikatListe);
      })
    })
    //   return this.restApi.getDatas(this.endpointB).subscribe((brugerCertifikat) => {
    //   this.certifikatListe = brugerCertifikat.filter((a: Bruger) => {
    //     a.certifikatStatus === 2;
    //   })
    //   console.log("certifikatStatus",this.certifikat);
    //   // const b = this.certifikatListe.filter((a: any) => {
    //   //   a.certifikatStatus === 2;
    //   // })
    //   console.log('list:', brugerCertifikat)     
    // });
  }

  onFindBrugerCertifikat() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.restApi.getParticipantByEventsTitle(this.searchkey, this.endpointK).subscribe(data => {
        this.certifikatListe = data;
        // console.log('hi:', this.certifikatListe)
      })
    }
  }

  //Godkend certifikat
  onBekraftCertifikat(id: any) {
    this.restApi.getData(id, this.endpointB).subscribe(data => {
      this.certifikat = data;
      
      this.certifikat.certifikatStatus = 3;
      this.restApi.updateData(id, this.endpointB, this.certifikat).subscribe(data => {
        this.ngOnInit();
      })
    })
  };

  //Benægt certifikat
  onBenagtCertifikat(id: any) {
    this.restApi.getData(id, this.endpointB).subscribe(data => {
      this.certifikat = data;
      this.certifikat.certifikatStatus = 1;
      this.certifikat.certifikatBilled = "";
      this.restApi.updateData(id, this.endpointB, this.certifikat).subscribe(data => {
        this.ngOnInit();
      })
    })
  }

  onVisBrugerCertifikat(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointB).subscribe((data) => {
      this.kontaktOplysningerId = data.kontaktOplysningerId;
      this.certifikat = data;
      // console.log(this.certifikat);
      this.restApi.getData(this.kontaktOplysningerId, this.endpointK).subscribe((data) => {
        this.kontaktOplysninger = data;
      })
    })
  }
}