import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { KontaktOplysninger } from 'src/app/Models/KontaktOplysninger';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-sogning',
  templateUrl: './ol-sogning.component.html',
  styleUrls: ['./ol-sogning.component.css']
})
export class OlSogningComponent implements OnInit {
  ol = new Øl;
  oller: Øl[];
  kontaktOplysning = new KontaktOplysninger;
  bryggeri: Bryggeri
  bryggerier: Bryggeri[];
  selected = ''
  endpointO = '/Øller';
  endpointB = '/Bryggerier';
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
    console.log('Kontkakt',localStorage.getItem('olKontaktOplysningerId'));
  }
  onHentOl() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
        this.restApi.getDatas(this.endpointO).subscribe((beer) => {
        this.oller = beer.filter((res: any) => {
          return res.bryggeriId != this.bryggeriId;
        });
        console.log(beer);
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
    this.restApi.getData(id, this.endpointO).subscribe(oldata => {
      this.ol = oldata;
      this.olId = this.ol.id;
      // console.log(this.beerId);
      localStorage.setItem('olId', JSON.stringify(this.olId));
      this.restApi.getData(this.ol.bryggeriId, this.endpointB).subscribe(bryg => {
        this.bryggeri = bryg;
        // console.log('bryggeriInfo:', this.brewery.contactInformationId);
        this.restApi.getData(bryg.kontaktOplysningerId, this.endpointK).subscribe(kontaktOplysningData => {
          this.kontaktOplysning = kontaktOplysningData;
          // this.kontaktOplysningId = this.kontaktOplysning.id;
          // console.log("kontakt", this.kontaktOplysning);
          localStorage.setItem('olKontaktOplysningerId', JSON.stringify(this.kontaktOplysning.id));
          this.router.navigate(['../ol/ol-side/', this.olId]);
        })
      })
    });
    
  }
}