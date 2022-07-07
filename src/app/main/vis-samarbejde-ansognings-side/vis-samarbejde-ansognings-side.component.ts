import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SamarbejdeOprettelseComponent } from '../samarbejde-oprettelse/samarbejde-oprettelse.component';

@Component({
  selector: 'app-vis-samarbejde-ansognings-side',
  templateUrl: './vis-samarbejde-ansognings-side.component.html',
  styleUrls: ['./vis-samarbejde-ansognings-side.component.css']
})
export class VisSamarbejdeAnsogningsSideComponent implements OnInit {
  @Input() godkendSamarbejde = {bryggeriId1: 0, bryggeriId2: 0, titel:'', samarbejdeBilled:'' }
  @Input() anmodernavn = {navn: ""}
  dialogRefOpretSamarbejde: MatDialogRef<SamarbejdeOprettelseComponent>;
  searchkey: string;
  bryggeriList1: any;
  bryggeriList2: any;
  brygger: any;
  brygs: any;
  bryg: any;
  endpointSA = '/SamarbejdeAnmodning';
  endpointS = '/Samarbejder';
  endpointB = '/Bryggerier';
  samarbejde: any;
  samarbejdeAnmodningsListe: any;
  samarbejdeAnmodningsListe1:any;
  samarbejdeAnmodning: any;
  clickButton: boolean = true;
  bryggeriId: number;
  constructor(public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    console.log(this.bryggeriId);
    this.onHentSamarbejdeListe();
    this.onHentSamarbejdeAnmodning();
  }

  onHentSamarbejdeAnmodning(){
    return this.restApi.getDatas(this.endpointSA).subscribe((dataSA) => {
      this.samarbejdeAnmodningsListe1=dataSA;
      //console.log('SA:', this.samarbejdeAnmodningsListe);
    })
  }

  //Vis bryggeri navn for eget bryggeri og den anden bryggeries navn
  onHentSamarbejdeListe() {
    return this.restApi.getDatas(this.endpointSA).subscribe((dataSA) => {
      this.samarbejdeAnmodningsListe = dataSA.filter((res: any) => {
        return res.bryggeriId2 === this.bryggeriId;
      });
      this.restApi.getDatas(this.endpointB).subscribe(dataB => {
        this.bryggeriList1 = dataB;
        for (let i = 0; i < this.bryggeriList1.length; i++) {
          if(this.samarbejdeAnmodningsListe.bryggeriId1 = this.bryggeriList1[i].id){
            // this.brygger = this.bryggeriList1[i];
            this.anmodernavn.navn = this.bryggeriList1[i];
          }
        }
      })
    })
  } 

  // onHentSamarbejde() {
  //   return this.restApi.getData(id, this.endpointSA).subscribe((data) => {
  //     this.samarbejdeAnmodning = data;
  //     this.anmodernavn.navn;
  //     // localStorage.setItem('bryggeriId1', JSON.stringify(this.samarbejdeAnmodning.bryggeriId1));
  //     // localStorage.setItem('bryggeriId2', JSON.stringify(this.samarbejdeAnmodning.bryggeriId2));
  //     // this.samarbejde.bryggeriId1 = JSON.parse(localStorage.getItem('bryggeriId1') || '{}');
  //     console.log(this.samarbejdeAnmodning);
  //     // return this.restApi.createData(this.samarbejde, this.endpointS).subscribe((data) => {
  //       // })
  //     })
  // }

  // onHentBryggeri(id: any ) {
  //   return this.restApi.getData(id, this.endpointB).subscribe((data) => {
  //     this.brygs.bryggeriId1 = data;
  //     // localStorage.setItem('bryggeriId1', JSON.stringify(this.samarbejdeAnmodning.bryggeriId1));
  //     // localStorage.setItem('bryggeriId2', JSON.stringify(this.samarbejdeAnmodning.bryggeriId2));
  //     // this.samarbejde.bryggeriId1 = JSON.parse(localStorage.getItem('bryggeriId1') || '{}');
  //     console.log(this.samarbejdeAnmodning);
  //     // return this.restApi.createData(this.samarbejde, this.endpointS).subscribe((data) => {
  //       // })
  //     })
  // }

  onVisBrygger(id: any) {
    this.clickButton = false;
    //console.log(id);
    // this.brugerId2=JSON.parse(localStorage.getItem('brugerId2') || '{}');
    // this.listPosts= this.posts.filter((res:any) => res.forumId === id && (res.brugerId2 === this.brugerId2 || res.brugerId1 === this.brugerId1))
    this.restApi.getData(id, this.endpointSA).subscribe(dataSA => {
      this.samarbejde = dataSA;
      console.log('test:', this.samarbejde);
      this.restApi.getData(this.samarbejde.bryggeriId1, this.endpointB).subscribe(dataB => {
        this.bryg = dataB;
        //console.log(this.bryg);
      })
    })
    // for (let i = 0; i < this.samarbejdeAnmodning.length; i++) {
    //   if(this.samarbejdeAnmodning[i].id = id)
    //   {
    //     this.bryg = this.samarbejdeAnmodning[i];
    //   }
    // }
    // this.bryg = this.brygger.filter((res: any) => res.id === id);
  }

  onFindSamarbejde() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.samarbejdeAnmodningsListe = this.samarbejdeAnmodningsListe.filter((res: any) => {
        return res.titel.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onSendSamarbejdeAnmodning() {
    if (JSON.stringify(this.bryggeriId) === '{}') {
      alert('du skal først oprette et bryggeri!')
    }
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "25%";
      dialogConfig.height = '50%';
      this.dialogRefOpretSamarbejde = this.dialog.open(SamarbejdeOprettelseComponent, dialogConfig);
      this.dialogRefOpretSamarbejde.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    }
  }

  onAccepterSamarbejde(bId1: any, bId2: any, aId: any , STitel: any, SBilled:any) {
      this.godkendSamarbejde.bryggeriId1 = bId1;
      this.godkendSamarbejde.bryggeriId2 = bId2;
      this.godkendSamarbejde.titel= STitel;
      this.godkendSamarbejde.samarbejdeBilled= SBilled;
      console.log(this.godkendSamarbejde);
      return this.restApi.createData(this.godkendSamarbejde, this.endpointS).subscribe((data) => {
        this.restApi.deleteData(aId, this.endpointSA).subscribe((data)=> {
          this.ngOnInit();
        })
      })
  }

  onAfslaSamarbejde(id: any) {
    this.restApi.deleteData(id, this.endpointSA).subscribe((data) => {
      this.onHentSamarbejdeListe();
    })
  }
}