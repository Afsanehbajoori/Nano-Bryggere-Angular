import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-certifikat',
  templateUrl: './certifikat.component.html',
  styleUrls: ['./certifikat.component.css']
})
export class CertifikatComponent implements OnInit {
  endpointU = '/Users';
  user : any;
  userId: number;
  file : any;
  url : string = "assets/images/Profil billede.png";
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    this.onLoadUser();
  }

  onLoadUser(){
    return this.restApi.getData(this.userId, this.endpointU).subscribe((userinfo: {}) => {
      this.user = userinfo;
    });
  }

  onSubmitCertificate(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url =e.target.result;
        this.user.certificatePicture = e.target.result;
        this.user.certificate = 0;
      }
    }
  };

  onUploadCertificate() {
    console.log(this.user);
    this.restApi.updateData(this.userId, this.endpointU, this.user).subscribe((data) => {
      this.router.navigate(['../main/main'])
    });
  }
}