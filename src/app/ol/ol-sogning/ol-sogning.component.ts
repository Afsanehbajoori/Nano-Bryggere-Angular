import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-sogning',
  templateUrl: './ol-sogning.component.html',
  styleUrls: ['./ol-sogning.component.css']
})
export class OlSogningComponent implements OnInit {
  beer = new Øl;
  beers: Øl[];
  kontakt = new Kontaktoplysninger;
  bryger: Bryggeri
  bryggerier: Bryggeri[];
  selected = ''
  endpoints = '/Øller';
  endpointB = '/Bryggerier';
  endpointk = '/Kontaktoplysninger';
  searchkey: string;
  search: any;
  data = sessionStorage.getItem('id');
  konktId: number;
  olId: number;
  bryggeriId: number;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadOl();
  }
  loadOl() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
        this.restApi.getDatas(this.endpoints).subscribe((beer) => {
        this.beers = beer.filter((res: any) => {
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
      this.beers = this.beers.filter(res => {
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onVisOlInfo(id: any) {
    this.restApi.getData(id, this.endpoints).subscribe(beers => {
      this.beer = beers;
      this.olId = this.beer.id;
      console.log(this.olId);
      localStorage.setItem('OlId', JSON.stringify(this.olId));
      this.restApi.getData(this.beer.bryggeriId, this.endpointB).subscribe(bryg => {
        this.bryger = bryg;
        console.log('bryggriInfo:', this.bryger.kontaktoplysningerId)
        this.restApi.getData(bryg.kontaktoplysningerId, this.endpointk).subscribe(kontakt => {
          this.kontakt = kontakt;
          this.konktId = this.kontakt.id;
          console.log("kontakt", this.konktId);
          localStorage.setItem('KId', JSON.stringify(this.konktId));
        })
      })
      this.router.navigate(['../ol/olside/', this.olId]);
    });
  }
}