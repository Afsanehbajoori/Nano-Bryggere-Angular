import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/delete-dialog-box/slet-dialog-box.component';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-admin-side',
  templateUrl: './ol-admin-side.component.html',
  styleUrls: ['./ol-admin-side.component.css']
})
export class OlAdminSideComponent implements OnInit {
  beers: Øl[];
  beer: Øl;
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
    this.onloadBeer()
  }
  onloadBeer(){
    return this.restApi.getDatas(this.endpoints).subscribe((beer) => {
      this.beers = beer;
    });
  }
  onFindBeer(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.beers = this.beers.filter(res =>{
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }
  onDeleteBeer(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpoints).subscribe(data => {
        this.onloadBeer();
      })
    });
  };
}
