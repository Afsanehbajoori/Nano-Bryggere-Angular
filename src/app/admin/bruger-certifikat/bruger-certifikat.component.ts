import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CertifikatDialogBoxComponent } from 'src/app/main/certifikat-dialog-box/certifikat-dialog-box.component';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-bruger-certifikat',
  templateUrl: './bruger-certifikat.component.html',
  styleUrls: ['./bruger-certifikat.component.css']
})
export class BrugerCertifikatComponent implements OnInit {
  oplysninger: Kontaktoplysninger[]; //oplysninger
  oplysning = new Kontaktoplysninger; //oplysning
  endpointI = '/Kontaktoplysninger'; 
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.onloadUser()
  }
  onloadUser(){
    return this.restApi.getDatas(this.endpointI).subscribe((user) => {
      this.oplysninger = user;
    })
  }
  onGivUserCertificate(id:any) {
    let dialogRef = this.dialog.open(CertifikatDialogBoxComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.updateData(id, this.endpointI, this.oplysninger).subscribe(data => {
        this.onloadUser();
      })
    });
  };
}