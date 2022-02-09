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
  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
  public eventtest: Events[];
  public event = new Events;
  endpoints = '/Events';
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEvent();
    this.loadSingleEvent()
  }
  loadEvent() {
    return this.restApi.getDatas(this.endpoints).subscribe((events) => {
      this.eventtest = events;
      this.event.titel = events.titel;
      console.log(this.eventtest);
    });
  }
  loadSingleEvent(){
    // this.panel.id.
    return this.restApi.getData(2, this.endpoints).subscribe((events) => {
      this.event = events;
      console.log(this.event.titel);
    });
  }

  onOpdaterEvent(id: any){
    this.router.navigate(['../events/rediger' + id]);
  }

  onOpretEvents() {
    this.router.navigate(['../events/oprette']);
  };
  onSletEvent(id: any) {
    this.loadSingleEvent();
    // this.event.id = ;
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    console.log(this.event.id);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpoints).subscribe(data => {
        this.loadEvent()
      })
    });
  }
}
