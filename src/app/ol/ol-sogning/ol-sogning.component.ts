import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Brewery } from 'src/app/Models/Brewery';
import { ContactInformation } from 'src/app/Models/ContactInformation';
import { Beer } from 'src/app/Models/Beer';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-sogning',
  templateUrl: './ol-sogning.component.html',
  styleUrls: ['./ol-sogning.component.css']
})
export class OlSogningComponent implements OnInit {
  beer = new Beer;
  beers: Beer[];
  userInfo = new ContactInformation;
  brewery: Brewery
  breweries: Brewery[];
  selected = ''
  endpointBr = '/Beers';
  endpointB = '/Breweries';
  endpointC = '/ContactInformation';
  searchkey: string;
  search: any;
  data = sessionStorage.getItem('id');
  userInfoId: number;
  beerId: number;
  breweryId: number;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onLoadBeer();
  }
  onLoadBeer() {
    if (this.breweryId = JSON.parse(localStorage.getItem('breweryId') || '{}')) {
        this.restApi.getDatas(this.endpointBr).subscribe((beer) => {
        this.beers = beer.filter((res: any) => {
          return res.breweryId != this.breweryId;
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
        return res.name.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onShowBeer(id: any) {
    this.restApi.getData(id, this.endpointBr).subscribe(beers => {
      this.beer = beers;
      this.beerId = this.beer.id;
      console.log(this.beerId);
      localStorage.setItem('beerId', JSON.stringify(this.beerId));
      this.restApi.getData(this.beer.breweryId, this.endpointB).subscribe(brew => {
        this.brewery = brew;
        console.log('bryggeriInfo:', this.brewery.contactInformationId)
        this.restApi.getData(brew.contactInformationId, this.endpointC).subscribe(userInfo => {
          this.userInfo = userInfo;
          this.userInfoId = this.userInfo.id;
          console.log("kontakt", this.userInfo);
          localStorage.setItem('contactInformationId', JSON.stringify(this.userInfoId));
        })
      })
      this.router.navigate(['../beer/beerpage/', this.beerId]);
    });
  }
}