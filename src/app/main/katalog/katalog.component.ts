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
  bruger = new Bruger;
  endpoints = '/Øller';
  data = sessionStorage.getItem('id');
  searchkey: string;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.loadOl()
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
      console.log(result);
      if(result == true)
      {
        this.restApi.deleteData(id, this.endpoints).subscribe(data => {
          this.loadOl();
        })
      }
    });
  };

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
}
