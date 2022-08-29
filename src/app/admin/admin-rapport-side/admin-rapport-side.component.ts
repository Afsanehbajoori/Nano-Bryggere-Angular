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
  rapport: any;
  bruger = new Bruger();
  testliste: any;
  endpointB = '/Bruger';
  endpointR = '/Rapports';
  searchkeyBrugernavn: string;
  searchkeyType: string;
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
    return this.restApi.getDatas(this.endpointR).subscribe((dataR) => {
      this.rapports = dataR;
    })
    // return this.restApi.getDatas(this.endpointR).subscribe((res) => {
    //   for (let i = 0; i < res.length; i++) {
    //     if(res.RapportId)
    //     {
    //       this.rapports = res[i]; 
    //     }
    //   }
    // });
  }

  onVisRapportInfo(id: any) {
    this.clickButton = false;
    // console.log(id)
    return this.restApi.getData(id, this.endpointR).subscribe((data) => {
      // this.rapportId = data.id;
      this.rapport = data;
      this.onRapportNavn(this.rapport.brugerId);
      console.log(this.rapport);
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

  //husk at kigge på slet bruger, kan ikke slettes før slet deltager og login
  onSletRapportBesked(id: any) {
   this.restApi.deleteData(id, this.endpointR).subscribe((data) => {
   });
  }

  onGodtagBesked(id: any) {
    this.rapport.godtaget = true;
    this.restApi.updateData(id, this.endpointR, this.rapport).subscribe((data) => {
    });
  }

  onRapportNavn(id: any) {
    return this.restApi.getData(id, this.endpointR).subscribe((data) => {
      // this.rapportId = data.id;
      this.testliste = data;
      console.log("navn", this.testliste.brugernavn);
      this.rapport.brugerId = this.testliste.brugernavn;
      console.log("navn id", this.rapport.brugerId);
      // console.log(this.testliste);
    });
    // // console.log(godtaget);
    // switch (navn) {
    //   case 0:
    //     navn = "Anmeld bruger";
    //     this.rapport.brugerId = navn;
    //     // console.log(navn);
    //     break;
    //   default:
    //     break;
    // }
  }
}