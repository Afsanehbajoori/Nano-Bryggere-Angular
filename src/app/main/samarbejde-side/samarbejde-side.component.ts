import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Samarbejde } from 'src/app/Models/Samarbejde';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';

@Component({
  selector: 'app-samarbejde-side',
  templateUrl: './samarbejde-side.component.html',
  styleUrls: ['./samarbejde-side.component.css']
})
export class SamarbejdeSideComponent implements OnInit {
  beers: any;
  beerliste: Øl[];
  beer: Øl;
  bryg = new Bryggeri;
  samarbejde: Samarbejde[];
  endpoints = '/Øller';
  data = sessionStorage.getItem('id');
  searchkey: string;
  bryggeriId: number;
  bryggeriList: any;
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
      console.log(this.bryggeriId);
      this.restApi.getDatas(this.endpoints).subscribe((data) => {
        this.beerliste = data.filter((res: any) => {
          return res.bryggeriId === this.bryggeriId});
      })
    }
  }

  onRedigerOl(id: any) {
    this.router.navigate(['../main/RedigerSamarbejdeOl/', id]);
  };

  onOpretOl() {
    this.router.navigate(['../main/opretteSamarbejdeOl']);
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