import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-side',
  templateUrl: './ol-side.component.html',
  styleUrls: ['./ol-side.component.css']
})
export class OlSideComponent implements OnInit {
  OlForm: FormGroup;
  kontaktoplysninger:any;
  ol:any;
  users: Kontaktoplysninger[];
  oller: Øl[];
  endpointk = '/Kontaktoplysninger';
  endpointo = '/Øller';
  olId: number;
  kontaktoplysningerId: number;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.kontaktoplysningerId = JSON.parse(localStorage.getItem('kontaktoplysningerId') || '{}');
    this.olId = JSON.parse(localStorage.getItem('OlId') || '{}');
    this.loadKontaktOplysninger();
    this.loadOl();
  }

  loadKontaktOplysninger(){
    return this.restApi.getData(this.kontaktoplysningerId, this.endpointk).subscribe((user) => {
      this.kontaktoplysninger = user;
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
