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
  bryg: Bryggeri;
  samarbejdeId: number;
  samarbejde: Samarbejde[];
  endpointo = '/Øller';
  endpointb = '/Bryggerier';
  endpoints = '/Samarbejder';
  searchkey: string;
  ølId: number;
  bryggeriId: number;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onLoadSamarbejde();
    this.onLoadOl();
  }
  onLoadOl() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
      this.restApi.getDatas(this.endpointo).subscribe((data) => {
        this.beerliste = data.filter((res: any) => {
          return res.samarbejdeId === this.samarbejdeId});
      })
    }
  }

  onLoadSamarbejde() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
      this.restApi.getData(this.bryggeriId, this.endpointb).subscribe((data) =>{
        this.bryg = data;
        this.samarbejdeId = this.bryg.samarbejdeId;
        console.log(this.samarbejdeId);
        this.restApi.getDatas(this.endpoints).subscribe((data) => {
          this.samarbejde = data.filter((res: any) => {
            localStorage.setItem(res.ølId,"olId");
            console.log(this.samarbejde);
            return res.samarbejdeId === this.samarbejdeId});
            console.log(this.samarbejde);
        })
      })
    }
  }

  onRedigerOl(id: any) {
    this.router.navigate(['../main/samarbejderediger/', id]);
  };

  onOpretOl() {
    this.router.navigate(['../main/samarbejdeopret']);
  };

  onSletOl(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true) {
        this.restApi.deleteData(id, this.endpoints).subscribe(data => {
          this.onLoadOl();
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