import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { BryggeriSamarbejde } from 'src/app/Models/BryggeriSamarbejde';
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
  beer: Øl;
  beerliste: Øl[];
  samarbejde: Samarbejde
  samarbejder: Samarbejde[];
  bryggeriSamarbejde: BryggeriSamarbejde;
  bryggeriSamarbejder: BryggeriSamarbejde[];
  samarbejdeId: number;
  endpointo = '/Øller';
  endpointb = '/Bryggerier';
  endpoints = '/Samarbejder';
  searchkey: string;
  ølId: number;
  bryg: Bryggeri;
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
          return res.bryggeriId === this.bryggeriId
        });
      })
    }
  }

  onLoadSamarbejde() {
    if (this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')) {
      this.restApi.getDatas(this.endpoints).subscribe((data) => {
        this.samarbejder = data.filter((res: any) => {
          return res.bryggeriId1 === this.bryggeriId || res.bryggeriId2 === this.bryggeriId;
        });
        this.samarbejder.forEach(function (value){
          console.log("Value",value.id);
        })
        console.log(this.bryggeriSamarbejder);
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