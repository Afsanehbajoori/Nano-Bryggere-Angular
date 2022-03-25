import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactInformation } from 'src/app/Models/ContactInformation';
import { User } from 'src/app/Models/User';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-certifikat',
  templateUrl: './certifikat.component.html',
  styleUrls: ['./certifikat.component.css']
})
export class CertifikatComponent implements OnInit {
  endpointU = '/Users';
  endpointC = '/ContactInformation';
  user: User;
  contact: ContactInformation;
  userList: User[];
  certificateId: number;
  userId: number;
  contactId: number;
  file : any;
  url : string = "assets/images/Profil billede.png";
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.onLoadUser();
  }

  onLoadUser(){
    if (this.userId = JSON.parse(localStorage.getItem('userId') || '{}')) {
      this.restApi.getData(this.userId, this.endpointU).subscribe((data) => {
        // this.userList = data.filter((res: any) => {
        //   return res.id === this.userId;
        // });
        this.user = data;
        console.log(this.user);
      })
    }
  }

  onSubmitCertificate(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url =e.target.result;
        this.user.certificatePicture = e.target.result;
        this.user.certificateLevel = 1;
      }
      console.log(this.user);
    }
  };

  onUploadCertificate() {
    console.log(this.user);
    this.restApi.updateData(this.userId, this.endpointU, this.user).subscribe((data) => {
      this.router.navigate(['../main/main'])
    });
  }
}