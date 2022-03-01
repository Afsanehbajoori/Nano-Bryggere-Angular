import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-lager',
  templateUrl: './ol-lager.component.html',
  styleUrls: ['./ol-lager.component.css']
})
export class OlLagerComponent implements OnInit {
  beerliste: Øl[];
  beerid = this.actRoute.snapshot.params['id'];
  endpoints = '/Øller';
  bryggeriId: number;
  LagerForm: FormGroup;
  olList : any = {};

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.LagerForm = new FormGroup({
      antal: new FormControl(''),
      // flaskeAntal: new FormControl(''),
      // tondeAntal: new FormControl(''),
      // flaskeResAntal: new FormControl(''),
    });
    this.loadLager();
  }

  loadLager() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
      this.restApi.getDatas(this.endpoints).subscribe((data) => {
        this.beerliste = data.filter((res: any) => {
          return res.bryggeriId === this.bryggeriId});
      })
    }
  }
  loadOl(){
    return this.restApi.getData(this.beerid, this.endpoints).subscribe((beer: {}) => {
      this.olList = beer;
    });
  }
  onSubmitLager(id: any) {
    this.restApi.updateData(this.beerid, this.endpoints, this.olList).subscribe((data) => {
      this.router.navigate(['../main/katalog'])
    });
  };
  onAnnullerLager() {
    return this.router.navigate(['../main/katalog'])
  };
}