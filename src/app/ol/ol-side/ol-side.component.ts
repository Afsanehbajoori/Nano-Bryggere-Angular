import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Brewery } from 'src/app/Models/Brewery';
import { ContactInformation } from 'src/app/Models/ContactInformation';
import { Beer } from 'src/app/Models/Beer';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-side',
  templateUrl: './ol-side.component.html',
  styleUrls: ['./ol-side.component.css']
})
export class OlSideComponent implements OnInit {
  userInfo: ContactInformation;
  beer: Beer;
  bewery: Brewery;
  endpointK = '/Kontaktoplysninger';
  endpointO = '/Øller';
  endpointB = '/Bryggerier';
  beweryId: Number;
  olId: number;
  userInfoId: number;
  id = this.actRoute.snapshot.params['id'];
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userInfoId = JSON.parse(localStorage.getItem('KId') || '{}');
    console.log("Ol",this.userInfoId); 
    this.olId = JSON.parse(localStorage.getItem('OlId') || '{}');
    this.onLoadBeer();
    this.onLoadUserinfo();
  }

  onLoadUserinfo(){
    console.log("Kontakt",this.userInfoId);
    return this.restApi.getData(this.userInfoId, this.endpointK).subscribe((user) => {
      this.userInfo = user;
      console.log(this.userInfo);
    })
  }

  onLoadBeer(){
    return this.restApi.getData(this.id, this.endpointO).subscribe((ol) => {
      this.beer = ol;
    })
  }
  
  onReturn() {
    this.router.navigate(['../ol/sogning']);
  };
}