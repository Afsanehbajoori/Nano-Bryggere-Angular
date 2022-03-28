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
  bryggeri: Bryggeri;
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
    this.kontaktOplysningerId = JSON.parse(localStorage.getItem('kontaktoplysningerId') || '{}');
    // console.log("Ol",this.userInfoId); 
    this.olId = JSON.parse(localStorage.getItem('olId') || '{}');
    this.onLoadOl();
    this.onLoadKontaktOplysninger();
  }

  onLoadKontaktOplysninger(){
    // console.log("Kontakt",this.userInfoId);
    return this.restApi.getData(this.kontaktOplysningerId, this.endpointK).subscribe((oplysninger) => {
      this.kontaktOplysninger = oplysninger;
      // console.log(this.userInfo);
    })
  }

  onLoadOl(){
    return this.restApi.getData(this.id, this.endpointO).subscribe((ol) => {
      this.ol = ol;
    })
  }
  
  onReturn() {
    this.router.navigate(['../beer/beersearch']);
  };
}