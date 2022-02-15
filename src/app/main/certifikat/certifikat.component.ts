import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-certifikat',
  templateUrl: './certifikat.component.html',
  styleUrls: ['./certifikat.component.css']
})
export class CertifikatComponent implements OnInit {
  // beers: Øl[];
  // beer = new Øl;
  endpoints = '/Øller';
  
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute 
  ) { }

  ngOnInit(): void {
  
  }

  loadOl(){
    return this.restApi.getDatas(this.endpoints).subscribe((beer) => {
      // this.beers = beer;
    })
  }

  //Task:
  // Vælg fil:
  //1. sæt data fra input over til string
  //2. 

  // Upload fil
  //1. hent brugerens certifikat data.
  //2. lav if statement som tjekker for data.
  //3. post hvis der ikke eksister et certifikat for brugeren og udpate hvis den allerede eksister.
  //4. 
}
