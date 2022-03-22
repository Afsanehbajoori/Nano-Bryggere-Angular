import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Beer } from 'src/app/Models/Beer';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
  beers: any;
  beerliste: Beer[];
  beer: Beer;
  endpointO = '/Øller';
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
    this.onloadBeer()
  }

  onloadBeer() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
      this.restApi.getDatas(this.endpointO).subscribe((data) => {
        this.beerliste = data.filter((res: any) => {
          return res.bryggeriId === this.bryggeriId;
        });
      })
    }
  }

  onUpdateBeer(id: any) {
    this.router.navigate(['../main/updatebeer/', id]);
  };

  onBeerLayer(id: any) {
    localStorage.setItem('lagerId', JSON.stringify(id));
    this.router.navigate(['../ol/ollager/', id]);
  };

  onCreateBeer() {
    this.router.navigate(['../main/createbeer']);
  };

  onDeleteBeer(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true) {
        this.restApi.deleteData(id, this.endpointO).subscribe(data => {
          this.onloadBeer();
        })
      }
    });
  };

  onFindBeer() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.beerliste = this.beerliste.filter(res => {
        return res.name.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }
}