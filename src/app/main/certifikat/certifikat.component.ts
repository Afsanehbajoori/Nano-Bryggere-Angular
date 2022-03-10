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
  endpoints = '/Brugere';
  valgtefil: File;
  bruger : any;
  brugerId: number;
  file : any;
  url : string = "assets/images/Profil billede.png";
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('kontaktoplysningerId') || '{}');
    this.loadBruger();
  }

  loadBruger(){
    return this.restApi.getData(this.brugerId, this.endpoints).subscribe((brugerinfo: {}) => {
      this.bruger = brugerinfo;
    });
  }

  onSubmitCertifikats(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url =e.target.result;
        this.bruger.certifikatImg = e.target.result;
        this.bruger.certifikat = 0;
      }
    }
  };
  onUploadCertifikat() {
    console.log(this.bruger);
    this.restApi.updateData(this.brugerId, this.endpoints, this.bruger).subscribe((data) => {
      this.router.navigate(['../main/main'])
    });
  }
}
