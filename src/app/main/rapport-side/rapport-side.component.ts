import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() nyRapport = { brugerId: 0, titel: "", besked: "", typenavn: 0 }
  
  endpointR = '/Rapports';
  rapport: Rapport;
  brugerList: Bruger[];
  brugerId: number;
  rapportId: number;
  typeN: any;
  items: any[] = [
    { id: 1, name: "Anmeld bruger" },
    { id: 2, name: "Andet"},
    { id: 2, name: "Spørgsmål" },
    { id: 3, name: "Meld fejl" }
  ];
  
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
      this.restApi.getDatas(this.endpointR).subscribe((data) => {
        for (let r = 0; r < data.length; r++) {
          if(data[r].brugerId == this.brugerId)
          this.rapport = data[r];  
        }
      })
    }
  }

  onHentRapport(){
    this.restApi.getDatas(this.endpointR).subscribe((data) => {
      for (let r = 0; r < data.length; r++) {
        if(data[r].brugerId == this.brugerId)
        this.rapport = data[r];  
      }
    })
  }

  onUploadRapport() {
    this.onRapportType();
    console.log("rapport ", this.rapport);
    this.restApi.createData(this.rapport, this.endpointR).subscribe((data) => {
      console.log("rapport ", this.rapport);
      this.ngOnInit();
    });
  }

  onRedigerRapport(id: any) {
    this.onRapportType();
    this.restApi.updateData(id, this.endpointR, this.rapport).subscribe((data) => {
      console.log("rapport ", this.rapport);
      this.router.navigate(['../main/main'])
    });
  }

  onRapportType() {
    this.typeN = this.items.map((item) => item.name)
    switch (this.typeN) {
      case 'Andet)':
        this.rapport.typeNavn = 0;
        break;
      case 'Anmeld bruger)':
        this.rapport.typeNavn = 1;
        break;
      case 'Spørgsmål)':
        this.rapport.typeNavn = 2;
        break;
      case 'Meld fejl)':
        this.rapport.typeNavn = 3;
        break;
      default:
        break;
    }
  }
}