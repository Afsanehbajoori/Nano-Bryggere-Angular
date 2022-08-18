import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-opret-rapport-dialog-box',
  templateUrl: './opret-rapport-dialog-box.component.html',
  styleUrls: ['./opret-rapport-dialog-box.component.css']
})

export class OpretRapportDialogBoxComponent implements OnInit {
  @Input() opretRapport = { brugerId: 0, titel: "", besked: "", typenavn: 0, godtaget: false, anklagetbruger: 0 }
  opretForm: any = new FormGroup({});
  endpointR = '/Rapports';
  endpointB = '/Bruger';
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
  // 

  constructor(
    public dialogRefOpretRapport: MatDialogRef<OpretRapportDialogBoxComponent>,
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    // this.onHentBruger();
    // this.onHentRapport();
    this.opretRapport.brugerId = this.brugerId;
    this.opretForm = this._formBuilder.group({
      'titel': new FormControl(''),
      'besked': new FormControl(''),
      'typenavn': new FormControl(''),
      'anklagetbruger': new FormControl(''),
    })
  }

  onUploadRapport() {
    // console.log("ny rapport", this.opretRapport);
    this.restApi.createData(this.opretRapport, this.endpointR).subscribe((data) => {
      this.dialogRefOpretRapport.close();
    });
  }
}