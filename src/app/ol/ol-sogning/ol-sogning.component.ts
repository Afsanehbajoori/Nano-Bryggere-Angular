import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { KontaktOplysninger } from 'src/app/Models/KontaktOplysninger';
import { Samarbejde } from 'src/app/Models/Samarbejde';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-sogning',
  templateUrl: './ol-sogning.component.html',
  styleUrls: ['./ol-sogning.component.css']
})
export class OlSogningComponent implements OnInit {
  ol: Øl;
  oller: Øl[];
  kontaktOplysning: KontaktOplysninger;
  samarbejde: Samarbejde
  bryggeri: any;
  bryggerier: Bryggeri[];
  selected = ''
  endpointO = '/Øller';
  endpointB = '/Bryggerier';
  endpointS = '/Samarbejder';
  endpointK = '/KontaktOplysninger';
  searchkey: string;
  search: any;
  data = sessionStorage.getItem('id');
  kontaktOplysningId: number;
  olId: number;
  bryggeriId: number;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentOl();
  }

  onHentOl() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
        this.restApi.getDatas(this.endpointO).subscribe((data) => {
        this.oller = data.filter((res: any) => {
          return res.bryggeriId != this.bryggeriId;
        });
      });
    }
  }

  onFindOl() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.oller = this.oller.filter(res => {
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onShowOl(id: any) {
    this.restApi.getData(id, this.endpointO).subscribe(data => {
      this.ol = data;
      this.olId = this.ol.id;
      localStorage.setItem('olId', JSON.stringify(this.olId));
      if(this.ol.bryggeriId){
        this.restApi.getData(this.ol.bryggeriId, this.endpointB).subscribe(bryg => {
          this.bryggeri = bryg;
          localStorage.setItem('olBryggeriId', JSON.stringify(this.bryggeri.id));
          this.restApi.getData(this.bryggeri.kontaktOplysningerId, this.endpointK).subscribe(kontaktOplysningData => {
            this.kontaktOplysning = kontaktOplysningData;
            // this.kontaktOplysningId = this.kontaktOplysning.id;
            localStorage.setItem('olKontaktOplysningerId', JSON.stringify(this.kontaktOplysning.id));
            this.router.navigate(['../øl/øl-side/', this.olId]);
          });
        });
      }
      if(this.ol.samarbejdeId){
        this.restApi.getData(this.ol.samarbejdeId, this.endpointS).subscribe(samarbejde => {
          this.samarbejde = samarbejde;
          this.restApi.getData(this.samarbejde.id, this.endpointS).subscribe(samarbejdeData => {
            this.samarbejde = samarbejdeData;
            // this.kontaktOplysningId = this.kontaktOplysning.id;
            localStorage.setItem('olSamarbejdeId', JSON.stringify(this.samarbejde.id));
            this.router.navigate(['../øl/øl-side-samarbejde/', this.olId]);
          });
        });
      }
    });
  }
}