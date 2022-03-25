import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RedigerProfilDialogBoxComponent } from 'src/app/main/rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { ContactInformation } from 'src/app/Models/ContactInformation';
import { User } from 'src/app/Models/User';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-bruger-certifikat',
  templateUrl: './bruger-certifikat.component.html',
  styleUrls: ['./bruger-certifikat.component.css']
})
export class BrugerCertifikatComponent implements OnInit {
  userList: ContactInformation[]; //oplysninger
  userInfo: ContactInformation;
  certificateList: User[];
  certificateInfo: User; //oplysninger
  userInfoId: number;
  endpointC = '/ContactInformation';
  endpointU = '/Users';
  clickButton: boolean = true;
  searchkey: string;
  dialogRefDelete: MatDialogRef<SletDialogBoxComponent>;
  dialogRefUpdateProfile: MatDialogRef<RedigerProfilDialogBoxComponent>;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onLoadUserCertificate();
  }

  onLoadUserCertificate() {
    return this.restApi.getDatas(this.endpointU).subscribe((userCertificate) => {
      this.certificateList = userCertificate.filter((res: any) => {
        res.certificateLevel === 1;
        this.restApi.getDatas(this.endpointC).subscribe((contactInfo) => {
          this.userList = contactInfo.filter((result: any) => {
            return result.id === res.id;
          })
        })
      })
    });
  }

  onFindUserCertificate() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.restApi.getParticipantByEventsTitle(this.searchkey, this.endpointC).subscribe(data => {
        this.certificateList = data;
        console.log('hi:', this.certificateList)
      })
    }
  }

  //Godkend certifikat
  onConfirmCertificate(id: any) {
    this.restApi.getData(id, this.endpointU).subscribe(data => {
      this.certificateInfo = data;
      this.certificateInfo.certificateLevel = 2;
      this.restApi.updateData(id, this.endpointU, this.certificateInfo).subscribe(data => {
        this.ngOnInit();
      })
    })
  };

  //Benægt certifikat
  onDenyCertificate(id: any) {
    this.restApi.getData(id, this.endpointU).subscribe(data => {
      this.certificateInfo = data;
      this.certificateInfo.certificateLevel = 0;
      this.restApi.updateData(id, this.endpointU, this.certificateInfo).subscribe(data => {
        this.ngOnInit();
      })
    })
  }

  onShowUserCertificate(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointU).subscribe((data) => {
      this.userInfoId = data.contactInformationId;
      this.certificateInfo = data;
      this.restApi.getData(this.userInfoId, this.endpointC).subscribe((data) => {
        this.userInfo = data;
      })
    })
  }
}