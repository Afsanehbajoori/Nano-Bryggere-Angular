import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { KontaktOplysninger } from 'src/app/Models/KontaktOplysninger';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-side-samarbejde',
  templateUrl: './ol-side-samarbejde.component.html',
  styleUrls: ['./ol-side-samarbejde.component.css']
})
export class OlSideSamarbejdeComponent implements OnInit {
  kontaktOplysninger1: KontaktOplysninger;
  kontaktOplysninger2: KontaktOplysninger;
  bryggeri1: Bryggeri;
  bryggeri2: Bryggeri;
  ol: Øl;
  bryggeri: Bryggeri;
  endpointK = '/KontaktOplysninger';
  endpointO = '/Øller';
  endpointS = '/Samarbejder';
  endpointB = '/Bryggerier';
  bryggeriId: Number;
  olId: number;
  samarbejdeId: number;
  kontaktOplysningerId1: number;
  kontaktOplysningerId2: number;
  bryggeriId1: number;
  bryggeriId2: number;
  id = this.actRoute.snapshot.params['id'];

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.samarbejdeId = JSON.parse(localStorage.getItem('olSamarbejdeId') || '{}');
    // console.log("Ol",this.userInfoId); 
    this.olId = JSON.parse(localStorage.getItem('olId') || '{}');
    console.log('Samarbejde', this.samarbejdeId);
    this.onHentOl();
    this.onHentKontaktOplysninger();
    this.onHentBryggerier();
  }
  onHentKontaktOplysninger() {
    // console.log("Kontakt",this.userInfoId);
    return this.restApi.getData(this.samarbejdeId, this.endpointS).subscribe((oplysninger) => {
      this.kontaktOplysningerId1 = oplysninger.bryggeriId1;
      this.kontaktOplysningerId2 = oplysninger.bryggeriId2;
      this.restApi.getData(this.kontaktOplysningerId1, this.endpointK).subscribe((oplysninger) => {
        this.kontaktOplysninger1 = oplysninger;
        console.log('kontaktOplysninger1', this.kontaktOplysninger1);
      })
      this.restApi.getData(this.kontaktOplysningerId2, this.endpointK).subscribe((oplysninger) => {
        this.kontaktOplysninger2 = oplysninger;
        console.log('kontaktOplysninger2', this.kontaktOplysninger2);
      })
    })
  }

  onHentBryggerier() {
    return this.restApi.getData(this.samarbejdeId, this.endpointS).subscribe((oplysninger) => {
      this.bryggeriId1 = oplysninger.bryggeriId1;
      this.bryggeriId2 = oplysninger.bryggeriId2;
      this.restApi.getData(this.bryggeriId1, this.endpointB).subscribe((data) => {
        this.bryggeri1 = data;
        console.log('bryggeri1', this.bryggeri1);
      })
      this.restApi.getData(this.bryggeriId2, this.endpointB).subscribe((data) => {
        this.bryggeri2 = data;
        console.log('bryggeri2', this.bryggeri2);
      })
    })
  }

  onHentOl() {
    return this.restApi.getData(this.id, this.endpointO).subscribe((ol) => {
      this.ol = ol;
    })
  }

  onTilbage() {
    localStorage.removeItem('olKontaktOplysningerId');
    this.router.navigate(['../øl/øl-søgning']);
  };
}
