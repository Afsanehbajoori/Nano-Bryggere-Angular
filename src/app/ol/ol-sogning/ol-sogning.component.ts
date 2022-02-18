import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bruger } from 'src/app/Models/Bruger';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-sogning',
  templateUrl: './ol-sogning.component.html',
  styleUrls: ['./ol-sogning.component.css']
})
export class OlSogningComponent implements OnInit {
  selected = ''
  beers: Øl[];
  beer = new Øl;
  bruger = new Bruger;
  endpoints = '/Øller';
  data = sessionStorage.getItem('id');
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    // this.loadOl();
  }
  loadOl(){
    return this.restApi.getDatas(this.endpoints).subscribe((beer) => {
      this.beers = beer;
    });
  }

  onFindOl(id:any) {
    this.router.navigate(['../ol/olside/',id]);
  };
}
