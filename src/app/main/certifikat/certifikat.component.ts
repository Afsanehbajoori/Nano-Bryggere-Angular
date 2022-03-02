import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bruger } from 'src/app/Models/Bruger';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-certifikat',
  templateUrl: './certifikat.component.html',
  styleUrls: ['./certifikat.component.css']
})
export class CertifikatComponent implements OnInit {
  endpoints = '/Brugere';
  valgtefil: File;
  bryg : Bryggeri;
  file : any;
  url : string = "assets/images/Profil billede.png";
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit(): void {

  }

  onSubmitCertifikats(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url =e.target.result;
      }
    }
  };
  onUploadCertifikat() {
    const fd = new FormData();
    fd.append('image', this.valgtefil, this.valgtefil.name)
    this.restApi.createData(this.bryg, this.endpoints)
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
