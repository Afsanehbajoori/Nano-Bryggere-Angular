import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { OpretRapportDialogBoxComponent } from '../opret-rapport-dialog-box/opret-rapport-dialog-box.component';

@Component({
  selector: 'app-rapport-side',
  templateUrl: './rapport-side.component.html',
  styleUrls: ['./rapport-side.component.css']
})

export class RapportSideComponent implements OnInit {
  dialogRefOpretRapport: MatDialogRef<OpretRapportDialogBoxComponent>;
  endpointR = '/Rapports';
  endpointB = '/Bruger';
  clickButton: boolean = true;
  bruger: any;
  brugerListe: any;
  rapports: any;
  listeTest: any;
  rapportListe = new Array;
  brugerId: number;
  rapportId: number;
  typeN: any;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.onHentBruger();
    this.onHentRapport();
    // this.nyRapport.brugerId = this.brugerId;
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
      this.rapports = data;
      for (let r = 0; r < data.length; r++) {
        const listDrop = {brugerId: this.rapports[r].brugerId, godtaget: this.rapports[r].godtaget, titel: this.rapports[r].titel, besked: this.rapports[r].besked, typeNavn: this.rapports[r].typeNavn, id: this.rapports[r].id}
        if (listDrop.brugerId == this.brugerId) {
          this.rapportListe.push(listDrop);
          // console.log("Rapports", this.rapportListe);
        }
      }
    })
  }

  onVisRapportInfo(id: any) {
    // console.log(id);
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointR).subscribe((data) => {
        this.listeTest = data;
        // console.log(this.listeTest.godtaget);
        this.onRapportType(this.listeTest.typeNavn);
        this.onRapportGodtagelse(this.listeTest.godtaget);
      })
  }

  onRapportType(type: any) {
    // console.log(godtaget);
    switch (type) {
      case 0:
        type = "Anmeld bruger";
        this.listeTest.typeNavn = type;
        // console.log(type);
        break;

      case 1:
        type = "Andet";
        this.listeTest.typeNavn = type;
        // console.log(type);
        break;
        case 2:
        type = "Spørgsmål";
        this.listeTest.typeNavn = type;
        // console.log(type);
        break;
        case 3:
        type = "Meld fejl";
        this.listeTest.typeNavn = type;
        // console.log(type);
        break;
      default:
        break;
    }
  }

  onRapportGodtagelse(godtaget: any) {
    // console.log(godtaget);
    switch (godtaget) {
      case false:
        godtaget = "Ikke set";
        this.listeTest.godtaget = godtaget;
        // console.log(godtaget);
        break;

      case true:
        godtaget = "Godkendt";
        this.listeTest.godtaget = godtaget;
        // console.log(godtaget);
        break;
      default:
        break;
    }
  }

  onOpretRapport() {
    if (JSON.stringify(this.brugerId) === '{}') {
      alert('tjek at du har en bruger!')
    }
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "25%";
      dialogConfig.height = '50%';
      this.dialogRefOpretRapport = this.dialog.open(OpretRapportDialogBoxComponent, dialogConfig);
      this.dialogRefOpretRapport.afterClosed().subscribe(result => {
        // this.ngOnInit();
      })
    }
  }
}