import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KontaktOplysninger } from 'src/app/Models/KontaktOplysninger';
import { Bruger } from 'src/app/Models/Bruger';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-certifikat',
  templateUrl: './certifikat.component.html',
  styleUrls: ['./certifikat.component.css']
})
export class CertifikatComponent implements OnInit {
  endpointB = '/Bruger';
  endpointK = '/KontaktOplysninger';
  bruger: Bruger;
  kontakt: KontaktOplysninger;
  brugerList: Bruger[];
  certifikatId: number;
  brugerId: number;
  kontaktId: number;
  file : any;
  url : string = "assets/images/Profil billede.png";
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.onHentBruger();
  }

  onHentBruger(){
    if (this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}')) {
      this.restApi.getData(this.brugerId, this.endpointB).subscribe((data) => {
        // this.brugerList = data.filter((res: any) => {
        //   return res.id === this.brugerId;
        // });
        this.bruger = data;
        // console.log(this.bruger);
      })
    }
  }

  onSubmitCertifikat(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url =e.target.result;
        this.bruger.certifikatBilled = e.target.result;
       
          this.bruger.certifikatStatus = 2;
        
        
      }
      // console.log(this.bruger);
    }
  };

  onUploadCertifikat() {
    // console.log(this.bruger);
    if(this.bruger.certifikatStatus == 2){

    }
    this.restApi.updateData(this.brugerId, this.endpointB, this.bruger).subscribe((data) => {
      this.router.navigate(['../main/main'])
    });
  }
}