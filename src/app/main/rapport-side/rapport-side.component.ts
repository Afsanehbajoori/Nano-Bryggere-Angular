import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Rapport } from 'src/app/Models/Rapport';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-rapport-side',
  templateUrl: './rapport-side.component.html',
  styleUrls: ['./rapport-side.component.css']
})

export class RapportSideComponent implements OnInit {
  @Input() nyRapport = { brugerId: 0, titel: "", besked: "", typenavn: 0, godtaget: false, anklagetbruger: 0 }
  opretForm: any = new FormGroup({});
  endpointR = '/Rapports';
  endpointB = '/Bruger';
  // opretRapport: Rapport;
  clickButton: boolean = true;
  bruger: any;
  brugerListe: any;
  rapport: any;
  rapports: any;
  listeTest: any;
  rapportListe = new Array;
  brugerId: number;
  rapportId: number;
  typeN: any;
  items: any[] = [
    { id: 0, name: "Anmeld bruger" },
    { id: 1, name: "Andet" },
    { id: 2, name: "Spørgsmål" },
    { id: 3, name: "Meld fejl" }
  ];

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.onHentBruger();
    this.onHentRapport();
    this.nyRapport.brugerId = this.brugerId;
    this.opretForm = this._formBuilder.group({
      'titel': new FormControl(''),
      'besked': new FormControl(''),
      'typenavn': new FormControl(''),
      'anklagetbruger': new FormControl(''),
    })
  }

  onHentBruger() {
    if (this.brugerId) {
      this.restApi.getDatas(this.endpointB).subscribe((data) => {
        this.brugerListe = data;
        for (let b = 0; b < data.length; b++) {
          const listDrop = {id: this.brugerListe[b].id} 
          if (listDrop.id == this.brugerId)
            this.bruger = listDrop;
        }
      })
    }
  }

  onHentRapport() {
    this.restApi.getDatas(this.endpointR).subscribe((data) => {
      // console.log(data);
      this.rapports = data;
      for (let r = 0; r < data.length; r++) {
        const listDrop = {brugerId: this.rapports[r].brugerId, titel: this.rapports[r].titel, besked: this.rapports[r].besked, typeNavn: this.rapports[r].typeNavn} 
        // console.log("BrugerId", listDrop);
        if (listDrop.brugerId == this.brugerId) {
          this.rapportListe.push(listDrop);
          console.log("Rapports", this.rapportListe);
        }
      }
    })
  }

  onUploadRapport() {
    this.onRapportType();
    // console.log("ny rapport", this.nyRapport);
    this.restApi.createData(this.nyRapport, this.endpointR).subscribe((data) => {
      // console.log("ny rapport", this.nyRapport);
      this.ngOnInit();
    });
  }

  // onRedigerRapport(id: any) {
  //   this.onRapportType();
  //   this.restApi.updateData(id, this.endpointR, this.rapport).subscribe((data) => {
  //     console.log("rapport ", this.rapport);
  //     this.router.navigate(['../main/main'])
  //   });
  // }

  onRapportType() {
    this.typeN = this.items.map((item) => item.id)
    // console.log(this.typeN);
    switch (this.typeN) {
      case '0':
        this.nyRapport.typenavn = 0;
        // console.log(this.nyRapport.typenavn);
        break;

      case '1':
        this.nyRapport.typenavn = 1;
        // console.log(this.nyRapport.typenavn);
        break;

      case '2':
        this.nyRapport.typenavn = 2;
        // console.log(this.nyRapport.typenavn);
        break;

      case '3':
        this.nyRapport.typenavn = 3;
        // console.log(this.nyRapport.typenavn);
        break;

      default:
        break;
    }
  }

  onVisRapportInfo(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointR).subscribe((data) => {
        this.listeTest = data;
      })
  }
}