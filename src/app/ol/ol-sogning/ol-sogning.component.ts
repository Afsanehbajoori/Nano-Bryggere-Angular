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
  userInfo = new Kontaktoplysninger;
  brewery: Bryggeri
  breweries: Bryggeri[];
  selected = ''
  endpointO = '/Øller';
  endpointB = '/Bryggerier';
  endpointK = '/Kontaktoplysninger';
  searchkey: string;
  search: any;
  data = sessionStorage.getItem('id');
  userInfoId: number;
  olId: number;
  breweryId: number;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onloadBeer();
  }
  onloadBeer() {
    if (this.breweryId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
        this.restApi.getDatas(this.endpointO).subscribe((beer) => {
        this.beers = beer.filter((res: any) => {
          return res.bryggeriId != this.breweryId;
        });
      });
    }
  }

  onFindBeer() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.beers = this.beers.filter(res => {
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onShowBeer(id: any) {
    this.restApi.getData(id, this.endpointO).subscribe(beers => {
      this.beer = beers;
      this.olId = this.beer.id;
      console.log(this.olId);
      localStorage.setItem('OlId', JSON.stringify(this.olId));
      this.restApi.getData(this.beer.bryggeriId, this.endpointB).subscribe(bryg => {
        this.brewery = bryg;
        console.log('bryggriInfo:', this.brewery.kontaktoplysningerId)
        this.restApi.getData(bryg.kontaktoplysningerId, this.endpointK).subscribe(userInfo => {
          this.userInfo = userInfo;
          this.userInfoId = this.userInfo.id;
          console.log("kontakt", this.userInfo);
          localStorage.setItem('KId', JSON.stringify(this.userInfoId));
        })
      })
      this.router.navigate(['../ol/olside/', this.olId]);
    });
  }
}