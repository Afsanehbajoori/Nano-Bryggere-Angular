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
  bryggeriId: number;
  endpointSA = '/SamarbejdeAnmodning';
  endpointS = '/Samarbejder';
  endpointB = '/Bryggerier';
  endpointO = '/Øller';
  bryggeriList: any;
  samarbejdeList: any;
  listTest: any;
  listTest2: any;
  samarbejdeAnmodning: any;
  bryggeriNavn = new Array();
  samarbejdeAnmodId = new Array();

  constructor(
    public dialogRefOpretSamarbejde: MatDialogRef<SamarbejdeOprettelseComponent>,
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.onHentAnmodninger();
    console.log("bryggeriID", this.bryggeriId);
    this.opretForm = this._formBuilder.group({
      'bryggeriId1': new FormControl(''),
      'bryggeriId2': new FormControl(''),
    })
  }

  /*TO BE DETERMINED
  // onHentSamarbejdeAnmodning() {
  //   this.restApi.getDatas(this.endpointSA).subscribe(dataSA => {
  //     this.samarbejdeAnmodning = dataSA;

  //     for (let sa = 0; sa < dataSA.length; sa++) {
  //       const dropdownInfo = { bryggeriId1: this.samarbejdeList[sa].bryggeriId1, bryggeriId2: this.samarbejdeList[sa].bryggeriId2 }
  //       if (dropdownInfo.bryggeriId2 != this.samarbejdeList[sa].bryggeriId1) {
  //         this.samarbejdeAnmodId = dataSA[sa];
  //       }
  //     }
  //   })
  // }

  // onHentSamarbejde() {
  //   this.restApi.getDatas(this.endpointS).subscribe(dataS => {
  //     this.samarbejdeList = dataS;

  //     for (let s = 0; s < dataS.length; s++) {
  //       const dropdownInfo = { bryggeriId1: this.samarbejdeList[s].bryggeriId1, bryggeriId2: this.samarbejdeList[s].bryggeriId2 }
  //       if (dropdownInfo.bryggeriId2 != this.bryggeriId || dropdownInfo.bryggeriId1 != this.bryggeriId) {
  //         this.samarbejdeId = dataS[s];
  //       }
  //     }
  //   })
  // }
 END OF TBD*/

  ///Check for sendte anmodninger og eget bryggeri
  ///1. Check for sendte anmodninger
  ///1.1. Videre giv info
  ///2. Check for eget bryggeri

  onCheckSamarbejdeAnmodning() {
    return this.restApi.getDatas(this.endpointSA).subscribe(dataSA => {
      this.samarbejdeList = dataSA;
      if (this.samarbejdeList) {
        for (let sa = 0; sa < dataSA.length; sa++) {
          const listDrop = { bryggeriId1: this.samarbejdeList[sa].bryggeriId1, bryggeriId2: this.samarbejdeList[sa].bryggeriId2, samarbejdeId: this.samarbejdeList[sa].id }
          if (listDrop.bryggeriId1 == this.bryggeriId || listDrop.bryggeriId2 == this.bryggeriId) {
            this.listTest = listDrop;
          }
        }
      }
    })
  }

  onCheckSamarbejde() {
    return this.restApi.getDatas(this.endpointS).subscribe(dataS => {
      this.samarbejdeList = dataS;
      if (this.samarbejdeList) {
        for (let sa = 0; sa < dataS.length; sa++) {
          const listDrop = { bryggeriId1: this.samarbejdeList[sa].bryggeriId1, bryggeriId2: this.samarbejdeList[sa].bryggeriId2, samarbejdeId: this.samarbejdeList[sa].id }
          if (listDrop.bryggeriId1 == this.bryggeriId || listDrop.bryggeriId2 == this.bryggeriId) {
            this.listTest2 = listDrop;
          }
        }
      }
    })
  }

  onHentAnmodninger() {
    this.onCheckSamarbejdeAnmodning();
    this.onCheckSamarbejde();
    this.restApi.getDatas(this.endpointB).subscribe(dataB => {
      this.bryggeriList = dataB;
      console.log("Second list", this.listTest);
      console.log("bryggeriCheck", this.listTest2);
      for (let b = 0; b < dataB.length; b++) {
        const dropdownInfo = { bryggerinavn: this.bryggeriList[b].navn, bryggeriId2: this.bryggeriList[b].id }
        if (dropdownInfo.bryggeriId2 != this.bryggeriId) {
          // console.log("ListTest", this.listTest, "ListTest2", this.listTest2);
          if (this.listTest && this.listTest2) {
            console.log("ListTest Check", this.listTest, "ListTest2 Check", this.listTest2);
            if (dropdownInfo.bryggeriId2 != this.listTest2.bryggeriId1 && dropdownInfo.bryggeriId2 != this.listTest2.bryggeriId2 || dropdownInfo.bryggeriId2 != this.listTest.bryggeriId1 && dropdownInfo.bryggeriId2 != this.listTest.bryggeriId2) {
              this.bryggeriNavn.push(dropdownInfo);
              console.log("Test DropdownInfo", dropdownInfo.bryggerinavn, dropdownInfo.bryggeriId2)
            }
          }
          else {
            if (this.listTest) {
              if (dropdownInfo.bryggeriId2 != this.listTest.bryggeriId1 && dropdownInfo.bryggeriId2 != this.listTest.bryggeriId2) {
                console.log("ListTest DropdownInfo", dropdownInfo.bryggerinavn, dropdownInfo.bryggeriId2)
                this.bryggeriNavn.push(dropdownInfo);
              }
            }
            else if(this.listTest2) {
            if (dropdownInfo.bryggeriId2 != this.listTest2.bryggeriId1 && dropdownInfo.bryggeriId2 != this.listTest2.bryggeriId2) {
                console.log("ListTest2 DropdownInfo", dropdownInfo.bryggerinavn, dropdownInfo.bryggeriId2)
                this.bryggeriNavn.push(dropdownInfo);
              }
            }
            else{
              console.log("ListTest2 DropdownInfo", dropdownInfo.bryggerinavn, dropdownInfo.bryggeriId2)
                this.bryggeriNavn.push(dropdownInfo);
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
    this.nySamarbejde.brygger1Svar = true;
    console.log(this.nySamarbejde);
    this.restApi.createData(this.nySamarbejde, this.endpointSA).subscribe((data) => {
      this.dialogRefOpretSamarbejde.close();
    })
  }
}