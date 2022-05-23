import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bruger } from 'src/app/Models/Bruger';
import { Rapport } from 'src/app/Models/Rapport';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-admin-rapport-side',
  templateUrl: './admin-rapport-side.component.html',
  styleUrls: ['./admin-rapport-side.component.css']
})
export class AdminRapportSideComponent implements OnInit {
dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  rapports: Rapport[];
  rapportId: number;
  brugerId: number;
  rapport = new Rapport();
  bruger = new Bruger();
  endpointB = '/Bruger'; //endpointB
  endpointR = '/Rapport'; //endpointK
  searchkeyBrugernavn: string;
  searchkeyType: string;
  certifikat: any;
  id = this.actRoute.snapshot.params['id'];
  clickButton: boolean = true;
  items: any[] = [
    {id:1, name: "Anmeld bruger"},
    {id:2, name: "Spørgsmål"},
    {id:3, name: "fejl"}
  ];
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentRapport();
  }

  onHentRapport() {
    return this.restApi.getDatas(this.endpointR).subscribe((res) => {
      this.rapports = res;
    });
  }

  onHentBruger() {
    return this.restApi.getData(this.rapport.anklagetBrugerId,this.endpointB).subscribe((res) => {
      this.bruger = res;
    });
  }

  onVisInfo(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointR).subscribe((data) => {
      this.rapportId = data.id;
    });
  }

  onFindBrugernavn() {
    if (this.searchkeyBrugernavn == "") {
      this.ngOnInit();
    }
    else {
      this.rapports = this.rapports.filter(res => {
        return res.titel.toLowerCase().match(this.searchkeyBrugernavn.toLowerCase());
      });
    }
  }

  onFindType() {
    if (this.searchkeyType == "") {
      this.ngOnInit();
    }
    else {
      this.restApi.getRapportByType(this.searchkeyType, this.endpointR).subscribe((data) => {
        return this.rapports = data;
      });
    }
  }

  //husk at kigge på slet bruger, kan ikke sltettes før slet deltager og login
  onSletBesked(id: any) {
   this.restApi.deleteData(id, this.endpointR).subscribe((data) => {

   });
  }

  onGodtagBesked(id: any) {
    this.restApi.updateData(id, this.endpointR, Rapport).subscribe((data) => {

    });
  }
}