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
  @Input() nySamarbejde = { olBilled: '', titel: '', bryggeriId1: 0, bryggeriId2: 0 }
  opretForm: any = new FormGroup({});
  olBilled: any;
  bryggeriId: number;
  endpointS = '/Samarbejder';
  endpointB = '/Bryggerier';
  endpointO = '/Øller';
  bryggeriList: any;
  samarbejdeList: any;
  bryggeriNavn = new Array();
  samarbejdeNavn = new Array();
  samarbejdeId: Samarbejde;
  constructor(
    public dialogRefOpretSamarbejde: MatDialogRef<SamarbejdeOprettelseComponent>,
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.onHentBryggeri();
    // this.onHentSamarbejde();
    this.opretForm = this._formBuilder.group({
      'olBilled': new FormControl(''),
      'titel': new FormControl('', Validators.required),
      'bryggeriId1': new FormControl(''),
      'bryggeriId2': new FormControl(''),
      //'olId': new FormControl('')
    })
  }

  // onHentSamarbejde() {
  //   this.restApi.getDatas(this.endpointS).subscribe(data => {
  //     this.samarbejdeList = data;
  //     this.samarbejdeList.find(x => x.bryggeriId2 == this.nySamarbejde.bryggeriId2);
  //   })
  // }

  // if(this.nySamarbejde.bryggeriId2 != data.bryggeriId2){
  //   this.restApi.createData(this.nySamarbejde, this.endpointS).subscribe(data => {
  //     console.log(data);
  //     localStorage.setItem('samarbejdeId', JSON.stringify(data.id))
  //     this.dialogRefOpretSamarbejde.close();
  //   })
  // }

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
  // onHentBryggeriListe() {
  //   this.restApi.getDatas(this.endpointB).subscribe(data => {
  //     this.bryggeriList = data;
  //     console.log(data);
  //     for (let i = 0; i < data.length; i++) {
  //       const dropdownInfo = { bryggerinavn: this.bryggeriList[i].navn, bryggeriId2: this.bryggeriList[i].id }
  //       if (this.bryggeriId != dropdownInfo.bryggeriId2) {
  //         this.restApi.getData(dropdownInfo.bryggeriId2, this.endpointS).subscribe(data => {
  //           this.samarbejdeId = data;
  //           console.log('Samarbejde Check', this.samarbejdeId);
  //           if (this.samarbejdeId.bryggeriId1 != this.bryggeriId) {
  //             this.bryggeriNavn.push(dropdownInfo)
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
  onHentBryggeri() {
    this.restApi.getDatas(this.endpointB).subscribe(dataB => {
      // this.onHentBryggeriListe();
      this.restApi.getDatas(this.endpointS).subscribe(dataS => {
        this.samarbejdeList = dataS;
        console.log("dataS",dataS);
        for (let s = 0; s < dataS.length; s++){
          const samarbejdelist = { bryggeriId1: this.samarbejdeList[s].bryggeriId1, bryggeriId2: this.samarbejdeList[s].bryggeriId2}
          console.log("update", this.samarbejdeList);
          if(this.bryggeriId != samarbejdelist.bryggeriId1 || this.bryggeriId != samarbejdelist.bryggeriId2){
            this.samarbejdeNavn.push(samarbejdelist)
            console.log(this.samarbejdeNavn);
          }
        }
        this.bryggeriList = dataB;
        for (let b = 0; b < dataB.length; b++) {
          const dropdownInfo = { bryggerinavn: this.bryggeriList[b].navn, bryggeriId2: this.bryggeriList[b].id }
          console.log("Check",this.samarbejdeNavn[b]);
          if (this.bryggeriId != dropdownInfo.bryggeriId2) {
            if(this.samarbejdeNavn[b].bryggeriId2 != dropdownInfo.bryggeriId2)
            { 
              this.bryggeriNavn.push(dropdownInfo)
            }
          }
        }
      }) 
    })
  }
  // onHentBryggeri() {
  //   this.onHentBryggeriListe();
  //   this.restApi.getDatas(this.endpointB).subscribe(data => {
  //     this.bryggeriList = data;
  //     for (let i = 0; i < data.length; i++) {
  //       const dropdownInfo = { bryggerinavn: this.bryggeriList[i].navn, bryggeriId2: this.bryggeriList[i].id }
  //       console.log("Check",this.samarbejdeList);
  //       if (this.bryggeriId != dropdownInfo.bryggeriId2 && dropdownInfo.bryggeriId2 != this.samarbejdeNavn.indexOf(dropdownInfo.bryggeriId2)) {
  //         this.bryggeriNavn.push(dropdownInfo)
  //       }
  //     }
  //   })
  // }

  onAnuller() {
    this.opretForm.reset();
    this.router.navigate(['/main/samarbejds-side'])
  }

  onSubmitProfilBilled(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.olBilled = e.target.result;
        localStorage.setItem('olBilled', JSON.stringify(this.olBilled));
      }
    }
  };

  onSubmitSamarbejde() {
    this.nySamarbejde.olBilled = JSON.parse(localStorage.getItem('olBilled') || '{}');
    this.nySamarbejde.bryggeriId1 = JSON.parse(localStorage.getItem('bryggeriId') || '{}');

    // console.log(data);
    // if (this.nySamarbejde.bryggeriId1 == data.bryggeriId1 && this.nySamarbejde.bryggeriId2 == data.bryggeriId2) {   
    // }
    //this.nySamarbejde.olId=JSON.parse(localStorage.getItem('olId') || '{}');
  }
}