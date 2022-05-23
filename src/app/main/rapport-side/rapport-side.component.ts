import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bruger } from 'src/app/Models/Bruger';
import { Rapport } from 'src/app/Models/Rapport';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-rapport-side',
  templateUrl: './rapport-side.component.html',
  styleUrls: ['./rapport-side.component.css']
})

export class RapportSideComponent implements OnInit {
  endpointR = '/Rapport';
  rapport: Rapport;
  brugerList: Bruger[];
  rapportList: Rapport[];
  brugerId: number;
  rapportId: number;
  items: any[] = [
    {id:1, name: "Anmeld bruger"},
    {id:2, name: "Spørgsmål"},
    {id:3, name: "Meld fejl"}
  ];

  file: any;
  url: string = "assets/images/Profil billede.png";

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.onHentBruger();
  }

  onHentBruger() {
    if (this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}')) {
      this.restApi.getData(this.brugerId, this.endpointR).subscribe((data) => {
        this.rapport = data;
      })
    }
  }

  onUploadRapport() {
    this.restApi.updateData(this.brugerId, this.endpointR, this.rapport).subscribe((data) => {
      console.log("rapport ",this.rapport);
      this.router.navigate(['../main/main'])
    });
  }
}