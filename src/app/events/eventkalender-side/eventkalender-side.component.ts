import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';
@Component({
  selector: 'app-eventkalender-side',
  templateUrl: './eventkalender-side.component.html',
  styleUrls: ['./eventkalender-side.component.css']
})
export class EventkalenderSideComponent implements OnInit {

  public events: Events[];
  endpoints = '/Events';
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEvent();
  }

  loadEvent() {
    return this.restApi.getDatas(this.endpoints).subscribe((data) => {
      this.events = data;
    });
  }

  onOpdaterEvent(id: any){
    this.router.navigate(['../events/rediger/' + id]);
  }

  onOpretEvents() {
    this.router.navigate(['../events/oprette']);
  };

  onSletEvent(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result == true)
      {
        this.restApi.deleteData(id, this.endpoints).subscribe(data => {
          this.loadEvent();
        })
      }
    });
  }
}
