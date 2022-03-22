import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';
import { browser } from 'protractor';
import { Brewery } from 'src/app/Models/Brewery';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-vis-detajler',
  templateUrl: './vis-detajler.component.html',
  styleUrls: ['./vis-detajler.component.css']
})
export class VisDetajlerComponent implements OnInit {
  breweryId:number;
  endpointB='/Bryggerier';
  breweryInfo: any;
  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.breweryId= JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    console.log('bry' , this.breweryId);
    this.onLoadBrewery();

  }

  onLoadBrewery(){
    this.restApi.getData(this.breweryId , this.endpointB).subscribe(data => {
      this.breweryInfo = data;
      console.log('detajler:' , this.breweryInfo.navn)
    })
  }
}
