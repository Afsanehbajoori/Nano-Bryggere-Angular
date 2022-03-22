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
  beerList: Beer[];
  beer: Beer;
  endpointB = '/Beers';
  searchkey: string;
  breweryId: number;
  breweryList: any;
  vintage: Date;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onLoadBeer()
  }

  onLoadBeer() {
    if (this.breweryId = JSON.parse(localStorage.getItem('breweryId') || '{}')) {
      this.restApi.getDatas(this.endpointB).subscribe((data) => {
        this.beerList = data.filter((res: any) => {
          return res.breweryId === this.breweryId;
        });
      })
    }
  }

  onUpdateBeer(id: any) {
    this.router.navigate(['../main/updatebeer/', id]);
  };

  onBeerLayer(id: any) {
    localStorage.setItem('layerId', JSON.stringify(id));
    this.router.navigate(['../ol/beerlayer/', id]);
  };

  onCreateBeer() {
    this.router.navigate(['../main/createbeer']);
  };

  onDeleteBeer(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true) {
        this.restApi.deleteData(id, this.endpointB).subscribe(data => {
          this.onLoadBeer();
        })
      }
    });
  };

  onFindBeer() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.beerList = this.beerList.filter(res => {
        return res.name.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }
}