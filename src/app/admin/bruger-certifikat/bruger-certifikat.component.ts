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
  certifikatListe: Bruger[];
  certifikat: Bruger; //oplysninger
  brugerId: number;
  endpointK = '/KontaktOplysninger';
  endpointBru = '/Bruger';
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
    return this.restApi.getDatas(this.endpointBru).subscribe((userCertificate) => {
      this.certifikatListe = userCertificate.filter((res: any) => {
        res.certificateLevel === 1;
        this.restApi.getDatas(this.endpointK).subscribe((contactInfo) => {
          this.kontaktOplysningsListe = contactInfo.filter((result: any) => {
            return result.id === res.id;
          })
        })
      })
    });
  }

  onFindBrugerCertifikat() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.restApi.getParticipantByEventsTitle(this.searchkey, this.endpointK).subscribe(data => {
        this.certifikatListe = data;
        console.log('hi:', this.certifikatListe)
      })
    }
  }

  //Godkend certifikat
  onBekraftCertifikat(id: any) {
    this.restApi.getData(id, this.endpointBru).subscribe(data => {
      this.certifikat = data;
      this.certifikat.certifikatLevel = 2;
      this.restApi.updateData(id, this.endpointBru, this.certifikat).subscribe(data => {
        this.ngOnInit();
      })
    })
  };

  //Benægt certifikat
  onBenagtCertifikat(id: any) {
    this.restApi.getData(id, this.endpointBru).subscribe(data => {
      this.certifikat = data;
      this.certifikat.certifikatLevel = 0;
      this.restApi.updateData(id, this.endpointBru, this.certifikat).subscribe(data => {
        this.ngOnInit();
      })
    })
  }

  onVisBrugerCertifikat(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointBru).subscribe((data) => {
      this.brugerId = data.contactInformationId;
      this.certifikat = data;
      this.restApi.getData(this.brugerId, this.endpointK).subscribe((data) => {
        this.kontaktOplysninger = data;
      })
    })
  }
}