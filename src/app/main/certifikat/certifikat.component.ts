import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-certifikat',
  templateUrl: './certifikat.component.html',
  styleUrls: ['./certifikat.component.css']
})
export class CertifikatComponent implements OnInit {
  endpoints = '/Brugere';
  valgtefil: File;
  bruger : Bruger;
  file : any;
  url = "";
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    // this.loadCertifikat();
  }

  // loadCertifikat() {
  //   return this.restApi.getDatas(this.endpoints).subscribe((beer) => {
  //     this.bruger = beer;
  //   })
  // }
  onSubmitCertifikat(e: any) {
    if(e.target.file){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event: any)=>{
        this.url =event.target.result;
      }
    }
  };
  onUploadCertifikat() {
    const fd = new FormData();
    // if(this.bruger.certifikat == null){}
    fd.append('image', this.valgtefil, this.valgtefil.name)
    this.restApi.createData(this.bruger, this.endpoints)
    .subscribe(res => {
      console.log(res);
      if(res.type == HttpEventType.UploadProgress){
        console.log('Upload Progress: ' + Math.round(res.loaded / res.total * 100) + '%');
      } else if(res.type === HttpEventType.Response){
        console.log(res);
      }
    });
  };
}
