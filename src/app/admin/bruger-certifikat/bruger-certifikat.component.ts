import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CertifikatDialogBoxComponent } from 'src/app/main/certifikat-dialog-box/certifikat-dialog-box.component';
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
  certificateList: User[]; //oplysninger
  userinfo = new ContactInformation; //oplysning
  endpointC = '/ContactInformation';
  endpointU = '/Users'; 
  clickButton:boolean = false;
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
    this.onLoadContactInfo();
    this.onLoadUserCertificate();
  }
  
  onLoadContactInfo(){
    return this.restApi.getDatas(this.endpointC).subscribe((contactInfo) => {
      this.userList = contactInfo;
    })
  }

  onLoadUserCertificate(){
    return this.restApi.getDatas(this.endpointU).subscribe((userCertificate) => {
      this.certificateList = userCertificate;
    })
  }

  onFindUserCertificate(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
     this.restApi.getParticipantByEventsTitle(this.searchkey , this.endpointC).subscribe(data => {
       this.certificateList=data;
       console.log('hi:', this.certificateList)
     })
    }
  }

  onGivUserCertificate(id:any) {
    let dialogRef = this.dialog.open(CertifikatDialogBoxComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.updateData(id, this.endpointC, this.userList).subscribe(data => {
        this.onLoadUserCertificate();
      })
    });
  };

  onDeleteUserCertificate(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      /* this.restApi.getData(id , this.endpoints).subscribe((data) => {
        this.kontaktoplysningerId= data.kontaktoplysningerId;
        console.log("kontId:",this.kontaktoplysningerId);
        this.restApi.deleteData(this.kontaktoplysningerId, this.endpointK).subscribe(data => {
          this.loadBruger();
        })
      })*/
      if(result){
        this.restApi.deleteData(id , this.endpointU).subscribe((data) => {
          console.log('delete:' , id);
          this.onLoadUserCertificate();
        })
      }
    });
  }

  onShowUserCertificate(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      /* this.restApi.getData(id , this.endpoints).subscribe((data) => {
        this.kontaktoplysningerId= data.kontaktoplysningerId;
        console.log("kontId:",this.kontaktoplysningerId);
        this.restApi.deleteData(this.kontaktoplysningerId, this.endpointK).subscribe(data => {
          this.loadBruger();
        })
      })*/
      if(result){
        this.restApi.deleteData(id , this.endpointU).subscribe((data) => {
          console.log('delete:' , id);
          this.onLoadUserCertificate();
        })
      }
    });
  }

  onUpdateUserCertificate(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      /* this.restApi.getData(id , this.endpoints).subscribe((data) => {
        this.kontaktoplysningerId= data.kontaktoplysningerId;
        console.log("kontId:",this.kontaktoplysningerId);
        this.restApi.deleteData(this.kontaktoplysningerId, this.endpointK).subscribe(data => {
          this.loadBruger();
        })
      })*/
      if(result){
        this.restApi.deleteData(id , this.endpointU).subscribe((data) => {
          console.log('delete:' , id);
          this.onLoadUserCertificate();
        })
      }
    });
  }

  // onDowngradeRolename(id: any) {
  //   var user = this.users.find((x: any) => x.id === id)
  //   console.log('info:', user?.roleId);
  //   var rolleId = user?.roleId;
  //   this.restApi.getData(rolleId, this.endpointR).subscribe(data => {
  //     var upgradeLevel = data;
  //     console.log('upgradeLevel', upgradeLevel.level)
  //     if (upgradeLevel.level == 300) {
  //       upgradeLevel.level = 200;
  //       upgradeLevel.rolleNavn = "Moderator";
  //     }
  //     else if (upgradeLevel.level == 200) {
  //       upgradeLevel.level = 100;
  //       upgradeLevel.rolleNavn = "User";
  //     }
  //     else if (upgradeLevel.level == 100) {
  //       upgradeLevel.level = 0;
  //       upgradeLevel.rolleNavn = "AnonUser";
  //     }
  //     else if (upgradeLevel.level == 0) {
  //       upgradeLevel.level = 0;
  //       upgradeLevel.rolleNavn = "AnonUser";
  //     }
  //     this.restApi.updateData(rolleId, this.endpointR, upgradeLevel).subscribe(data => {
  //       console.log('ny:', upgradeLevel.level);
  //       this.ngOnInit();
  //     })
  //   })
  // }
}