import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { KontaktOplysninger } from 'src/app/Models/KontaktOplysninger';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-side',
  templateUrl: './ol-side.component.html',
  styleUrls: ['./ol-side.component.css']
})
export class OlSideComponent implements OnInit {
  kontaktOplysninger: KontaktOplysninger;
  ol: Øl;
  bryggeri: any;
  endpointK = '/KontaktOplysninger';
  endpointO = '/Øller';
  endpointB = '/Bryggerier';
  bryggeriId: Number;
  olId: number;
  kontaktOplysningerId: number;
  id = this.actRoute.snapshot.params['id'];
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.kontaktOplysningerId = JSON.parse(localStorage.getItem('olKontaktOplysningerId') || '{}');
    this.bryggeriId = JSON.parse(localStorage.getItem('olBryggeriId') || '{}');
    this.olId = JSON.parse(localStorage.getItem('olId') || '{}');
    this.onHentOl();
    this.onHentKontaktOplysninger();
    this.onHentBryggeri();
    // console.log("Ol",this.userInfoId); 
    // Kconsole.log('Kontkakt',this.kontaktOplysningerId);
  }

  onHentKontaktOplysninger(){
    // console.log("Kontakt",this.userInfoId);
    return this.restApi.getData(this.kontaktOplysningerId, this.endpointK).subscribe((data) => {
      this.kontaktOplysninger = data;
      // console.log(this.userInfo);
    })
  }

  onHentBryggeri(){
    return this.restApi.getData(this.bryggeriId, this.endpointB).subscribe((data) => {
      this.bryggeri = data;
    })
  }

  onHentOl(){
    return this.restApi.getData(this.id, this.endpointO).subscribe((data) => {
      this.ol = data;
    })
  }
  
  onTilbage() {
    localStorage.removeItem('olKontaktOplysningerId');
    localStorage.removeItem('olBryggeriId');
    this.router.navigate(['../øl/øl-søgning']);
  };
}