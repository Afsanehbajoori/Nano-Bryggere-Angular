import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bruger } from 'src/app/Models/Bruger';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-sogning',
  templateUrl: './ol-sogning.component.html',
  styleUrls: ['./ol-sogning.component.css']
})
export class OlSogningComponent implements OnInit {
  beer = new Øl;
  bruger = new Bruger;
  beers: Øl[];
  brugers : Bruger[];
  bryggerier: Bryggeri[];
  selected = ''
  endpoints = '/Øller';
  endpointB = '/Bryggerier';
  searchkey: string;
  search: any;
  data = sessionStorage.getItem('id');
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    sessionStorage.removeItem('OlId');
    this.loadOl();
  }
  loadOl(){
    return this.restApi.getDatas(this.endpoints).subscribe((beer) => {
      this.beers = beer;
    });
  }

  loadBryg(){
    return this.restApi.getDatas(this.endpointB).subscribe((bryg) => {
      this.bryggerier = bryg;
    });
  }

  onFindOl(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.beers = this.beers.filter(res =>{
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }
  onVisOlInfo(Oid:any, Bid:any){
    localStorage.setItem('OlId' ,JSON.stringify(Oid));
    localStorage.setItem('BId' ,JSON.stringify(Bid));
    this.router.navigate(['../ol/olside/',Oid]);
  }
}