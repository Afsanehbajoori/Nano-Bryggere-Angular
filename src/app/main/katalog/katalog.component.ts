import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bruger } from 'src/app/Models/Bruger';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
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
    this.loadOl()
  }
  loadBrugere(){
    return this.restApi.getData(this.data, this.endpoints).subscribe((bruger) => {
      this.bruger = bruger;
    });
  }
  loadOl(){
    return this.restApi.getDatas(this.endpoints).subscribe((beer) => {
      this.beers = beer;
    });
  }

  onRedigerOl(id:any) {
    this.router.navigate(['../main/redigerol/',id]);
  };

  onOpretOl() {
    this.router.navigate(['../main/opretteol']);
  };

  onSletOl(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpoints).subscribe(data => {
        this.loadOl();
      })
    });
  };
}
