import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Samarbejde } from 'src/app/Models/Samarbejde';

@Component({
  selector: 'app-samarbejde-oprettelse',
  templateUrl: './samarbejde-oprettelse.component.html',
  styleUrls: ['./samarbejde-oprettelse.component.css']
})
export class SamarbejdeOprettelseComponent implements OnInit {
  @Input() nySamarbejde = { bryggeriId1: 0, bryggeriId2: 0, brygger1Svar: true }
  opretForm: any = new FormGroup({});
  olBilled: any;
  bryggeriId: number;
  endpointSA = '/SamarbejdeAnmodning';
  endpointS = '/Samarbejder';
  endpointB = '/Bryggerier';
  endpointO = '/Øller';
  bryggeriList: any;
  samarbejdeList: any;
  samarbejdeAnmodning: any;
  bryggeriNavn = new Array();
  samarbejdeId = new Array();
  samarbejdeAnmodId = new Array();
  // samarbejdeId: Samarbejde;
  constructor(
    public dialogRefOpretSamarbejde: MatDialogRef<SamarbejdeOprettelseComponent>,
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.onHentSamarbejde();
    this.onHentSamarbejdeAnmodning();
    this.onHentBryggeri();
    console.log(this.bryggeriId);
    this.opretForm = this._formBuilder.group({
      'bryggeriId1': new FormControl(''),
      'bryggeriId2': new FormControl(''),
    })
  }

  // Stop visning af bruger med samarbejde mellem hinanden.
  // If bryggeriId allered er i et samarbejde med egen brygger.
  // Check samarbejds liste for bryggeriId´er.
  // Se om bryggeriId 1 og bryggeriId 2 allerede har et samarbejde sammen.
  //  onHentBryggeriListe() {
  // this.restApi.getDatas(this.endpointS).subscribe(data => {
  //   this.samarbejdeList = data;
  //   for (let i = 0; i < data.length; i++) {
  //     const dropdownInfo = { bryggeriId: this.samarbejdeList[i].bryggeriId1, bryggeriId2: this.samarbejdeList[i].bryggeriId2, id: this.bryggeriList[i].id }
  //     if (this.bryggeriId == dropdownInfo.bryggeriId) {
  //       this.samarbejdeNavn.push(dropdownInfo)
  //       console.log("liste",this.samarbejdeNavn);
  //     }
  //   }
  // })
  //   this.restApi.getDatas(this.endpointS).subscribe(dataS => {
  //     // this.samarbejdeList = dataS;
  //     console.log("dataS",dataS);
  //     for (let s = 0; s < dataS.length; s++){
  //       const samarbejdelist = { bryggeriId1: this.samarbejdeList[s].bryggeriId1, bryggeriId2: this.samarbejdeList[s].bryggeriId2}
  //       console.log("update", this.samarbejdeList);
  //       if(this.bryggeriId != samarbejdelist.bryggeriId1 || this.bryggeriId != samarbejdelist.bryggeriId2){
  //         this.samarbejdeNavn.push(samarbejdelist)
  //         console.log(this.samarbejdeNavn);
  //       }
  //     }
  //   })
  // }
  
  onHentSamarbejdeAnmodning() {
    this.restApi.getDatas(this.endpointSA).subscribe(dataSA => {
      this.samarbejdeAnmodning = dataSA;

      for (let sa = 0; sa < dataSA.length; sa++) {
        const dropdownInfo = { bryggeriId1: this.samarbejdeList[sa].bryggeriId1, bryggeriId2: this.samarbejdeList[sa].bryggeriId2 }
        if (dropdownInfo.bryggeriId2 != this.samarbejdeList[sa].bryggeriId1) {
          this.samarbejdeAnmodId = dataSA[sa];
        }
      }
    })
  }

  onHentSamarbejde() {
    this.restApi.getDatas(this.endpointS).subscribe(dataS => {
      this.samarbejdeList = dataS;

      for (let s = 0; s < dataS.length; s++) {
        const dropdownInfo = { bryggeriId1: this.samarbejdeList[s].bryggeriId1, bryggeriId2: this.samarbejdeList[s].bryggeriId2 }
        if (dropdownInfo.bryggeriId2 != this.bryggeriId || dropdownInfo.bryggeriId1 != this.bryggeriId) {
          this.samarbejdeId = dataS[s];
        }
      }
    })
  }

  onHentBryggeri() {
    this.restApi.getDatas(this.endpointB).subscribe(dataB => {
      // this.onHentBryggeriListe();
      // this.samarbejdeList = dataSA;

      // for (let s = 0; s < dataSA.length; s++){
      //   const samarbejdelist = { bryggeriId1: this.samarbejdeList[s].bryggeriId1, bryggeriId2: this.samarbejdeList[s].bryggeriId2}
      //   console.log("update", this.samarbejdeList);
      //   if(this.bryggeriId != samarbejdelist.bryggeriId1 || this.bryggeriId != samarbejdelist.bryggeriId2){
      //     this.samarbejdeNavn.push(samarbejdelist)
      //     console.log(this.samarbejdeNavn);
      //   }
      // }
      this.bryggeriList = dataB;

      for (let b = 0; b < dataB.length; b++) {
        const dropdownInfo = { bryggerinavn: this.bryggeriList[b].navn, bryggeriId2: this.bryggeriList[b].id }
        // console.log("Check", this.samarbejdeNavn[b]);
        // if(this.samarbejdeNavn[b].bryggeriId2 != dropdownInfo.bryggeriId2)
        if (dropdownInfo.bryggeriId2 != this.bryggeriId) {
          {
            console.log(dropdownInfo.bryggerinavn, dropdownInfo.bryggeriId2)
            if (dropdownInfo.bryggeriId2 != this.samarbejdeId[b].bryggeriId1 || dropdownInfo.bryggeriId2 != this.samarbejdeId[b].bryggeriId2) {
              this.bryggeriNavn.push(dropdownInfo)
              console.log(this.bryggeriNavn)
            }
          }
        }
      }
    })
  }

  onAnuller() {
    this.opretForm.reset();
    this.router.navigate(['/main/samarbejds-side'])
  }

  onSubmitSamarbejde() {
    this.nySamarbejde.bryggeriId1 = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    // this.anmodning.anmodersNavn = this.bryggeriNavn.
    this.nySamarbejde.brygger1Svar = true;
    console.log(this.nySamarbejde);

    this.restApi.createData(this.nySamarbejde, this.endpointSA).subscribe((data) => {
      this.dialogRefOpretSamarbejde.close();
    })
  }
}