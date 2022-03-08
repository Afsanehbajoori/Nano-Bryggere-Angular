import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  ol: Øl;
  bryggeri: Bryggeri;
  endpointk = '/Kontaktoplysninger';
  endpointo = '/Øller';
  endpointb = '/Bryggerier';
  bryggerid: Number;
  olId: number;
  kontaktoplysningerId: number;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.olId = JSON.parse(localStorage.getItem('OlId') || '{}');
    this.bryggerid = JSON.parse(localStorage.getItem('BId') || '{}');
    this.loadBryg(); 
    this.kontaktoplysningerId = JSON.parse(localStorage.getItem('KontaktId') || '{}');
    this.loadKontaktOplysninger();
    this.loadOl();
  }

  loadBryg(){
    return this.restApi.getData(this.bryggerid, this.endpointb).subscribe((bryg) => {
      this.bryggeri = bryg;
      localStorage.setItem('KontaktId' ,JSON.stringify(this.bryggeri.kontaktoplysningerId));
    })
  }

  loadKontaktOplysninger(){
    return this.restApi.getData(this.kontaktoplysningerId, this.endpointk).subscribe((user) => {
      this.oplysninger = user;
    })
  }

  loadOl(){
    return this.restApi.getData(this.olId, this.endpointo).subscribe((ol) => {
      this.ol = ol;
    })
  }
  
  onTilbage() {
    this.router.navigate(['../ol/sogning']);
  };
}