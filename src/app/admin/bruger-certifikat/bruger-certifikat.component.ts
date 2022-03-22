import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CertifikatDialogBoxComponent } from 'src/app/main/certifikat-dialog-box/certifikat-dialog-box.component';
import { ContactInformation } from 'src/app/Models/ContactInformation';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-bruger-certifikat',
  templateUrl: './bruger-certifikat.component.html',
  styleUrls: ['./bruger-certifikat.component.css']
})
export class BrugerCertifikatComponent implements OnInit {
  userinfos: ContactInformation[]; //oplysninger
  userinfo = new ContactInformation; //oplysning
  endpointC = '/ContactInformation'; 
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
    return this.restApi.getDatas(this.endpointC).subscribe((user) => {
      this.userinfos = user;
    })
  }
  onGivUserCertificate(id:any) {
    let dialogRef = this.dialog.open(CertifikatDialogBoxComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.updateData(id, this.endpointC, this.userinfos).subscribe(data => {
        this.onloadUser();
      })
    });
  };
}