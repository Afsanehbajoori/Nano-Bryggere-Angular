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
  olListe: Øl[];
  ol: Øl;
  endpointB = '/Øller';
  searchkey: string;
  bryggeriId: number;
  bryggeriListe: any;
  argang: Date;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onHentOl()
  }

  onHentOl() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
      this.restApi.getDatas(this.endpointB).subscribe((data) => {
        this.olListe = data.filter((res: any) => {
          return res.bryggeriId === this.bryggeriId;
        });
      })
    }
  }

  onOpdaterOl(id: any) {
    this.router.navigate(['../main/redigerol/', id]);
  };

  onOlLager(id: any) {
    localStorage.setItem('lagerId', JSON.stringify(id));
    this.router.navigate(['../ol/ollager/', id]);
  };

  onOpretOl() {
    this.router.navigate(['../main/opretol']);
  };

  onSletOl(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result == true) {
        this.restApi.deleteData(id, this.endpointB).subscribe(data => {
          this.onHentOl();
        })
      }
    });
  };

  onFindOl() {
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.olListe = this.olListe.filter(res => {
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }
}