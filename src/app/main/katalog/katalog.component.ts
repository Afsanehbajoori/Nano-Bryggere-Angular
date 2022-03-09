import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
  beers: any;
  beerliste: Øl[];
  beer: Øl;
  endpoints = '/Øller';
  searchkey: string;
  bryggeriId: number;
  bryggeriList: any;
  argang: Date;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadOl()
  }

  loadOl() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
      this.restApi.getDatas(this.endpoints).subscribe((data) => {
        this.beerliste = data.filter((res: any) => {
          return res.bryggeriId === this.bryggeriId;
        });
      })
    }
  }

  onRedigerOl(id: any) {
    this.router.navigate(['../main/redigerol/', id]);
  };

  onLager(id: any) {
    localStorage.setItem('lagerId', JSON.stringify(id));
    this.router.navigate(['../ol/ollager/', id]);
  };

  onOpretOl() {
    this.router.navigate(['../main/opretteol']);
  };

  onSletOl(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true) {
        this.restApi.deleteData(id, this.endpoints).subscribe(data => {
          this.loadOl();
        })
      }
    });
  };

  onFindOl() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.beerliste = this.beerliste.filter(res => {
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }
}