import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-side',
  templateUrl: './ol-side.component.html',
  styleUrls: ['./ol-side.component.css']
})
export class OlSideComponent implements OnInit {
  oplysninger: Kontaktoplysninger;
  beer: Øl;
  bryggeri: Bryggeri;
  endpointk = '/Kontaktoplysninger';
  endpointo = '/Øller';
  endpointb = '/Bryggerier';
  bryggerid: Number;
  olId: number;
  kontaktoplysningerId: number;
  id = this.actRoute.snapshot.params['id'];
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.kontaktoplysningerId = JSON.parse(localStorage.getItem('KId') || '{}');
    console.log("Ol",this.kontaktoplysningerId); 
    this.olId = JSON.parse(localStorage.getItem('OlId') || '{}');
    this.loadOl();
    this.loadKontaktOplysninger();
  }

  loadKontaktOplysninger(){
    console.log("Kontakt",this.kontaktoplysningerId);
    return this.restApi.getData(this.kontaktoplysningerId, this.endpointk).subscribe((user) => {
      this.oplysninger = user;
      console.log(this.oplysninger);
    })
  }

  loadOl(){
    return this.restApi.getData(this.id, this.endpointo).subscribe((data) => {
      this.beer = data;
    })
  }
  
  onTilbage() {
    this.router.navigate(['../ol/sogning']);
  };
}