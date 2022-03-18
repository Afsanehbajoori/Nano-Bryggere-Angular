import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SletDialogBoxComponent } from '../slet-dialog-box/slet-dialog-box.component';

@Component({
  selector: 'app-samarbejde-visning',
  templateUrl: './samarbejde-visning.component.html',
  styleUrls: ['./samarbejde-visning.component.css']
})
export class SamarbejdeVisningComponent implements OnInit {
  beer: Øl;
  beerId: number;
  endpointO = '/Øller';
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onLoadCooperation();
  }
  onLoadCooperation() {
    if (this.beerId = JSON.parse(localStorage.getItem('sOlId') || '{}')) {
        this.restApi.getData(this.beerId, this.endpointO).subscribe(data => {
        this.beer = data;
      })
    }
  }

  onUpdateBeer(id: any) {
    this.router.navigate(['../main/samarbejderediger/', id]);
  };

  onDeleteBeer(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true) {
        this.router.navigate(['../admin/admin/']);
      }
    });
  };
}