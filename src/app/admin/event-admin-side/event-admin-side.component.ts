import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { OpretteEventsDialogBoxComponent } from '../oprette-events-dialog-box/oprette-events-dialog-box.component';
import { UpdateEventsDialogBoxComponent } from '../update-events-dialog-box/update-events-dialog-box.component';

@Component({
  selector: 'app-event-admin-side',
  templateUrl: './event-admin-side.component.html',
  styleUrls: ['./event-admin-side.component.css']
})
export class EventAdminSideComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefOpretEvents: MatDialogRef<OpretteEventsDialogBoxComponent>;
  dialogRefOpdaterEvents: MatDialogRef<UpdateEventsDialogBoxComponent>;
  searchkeyEventTitel: string;
  searchkeyDeltagelse: string;
  clickButton: boolean = true;
  eventListe: any;
  events: Events[];
  //event = new Events();
  endpointE = '/Events';
  endpointD = '/Deltager';
  id = this.actRoute.snapshot.params['id'];
  deltagelseListe: any;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.onHentEvents();
    this.onHentDeltagelse()
  }

  onHentEvents() {
    return this.restApi.getDatas(this.endpointE).subscribe(event => {
      this.events = event;
    })
  }
  onHentDeltagelse() {
    this.restApi.getDatas(this.endpointD).subscribe(data => {
      this.deltagelseListe = data
      // console.log('del:', this.deltagelseListe)
    })
  }

  onVisEvent(id: any) {
    this.clickButton = false;
    return this.restApi.getData(id, this.endpointE).subscribe(data => {
      this.eventListe = data;
      // console.log('eventList:', this.eventListe);
    })
  }

  onFindEventTitel() {
    if (this.searchkeyEventTitel == "") {
      this.ngOnInit();
    }
    else {
      this.events = this.events.filter(res => {
        return res.titel.toLowerCase().match(this.searchkeyEventTitel.toLowerCase());
      })
    }
  }

  onFindDeltagene() {
    if (this.searchkeyDeltagelse == "") {
      this.ngOnInit();
    }
    else {
      this.restApi.getEventParticipantsByUsername(this.searchkeyDeltagelse.toLowerCase(), this.endpointE).subscribe((data) => {
        // console.log('deltag:', data)
        return this.events = data;
      })
    }
  }

  onSletEvent(id: any) {
    if (this.deltagelseListe.length !== 0) {
      alert('der er nogle der deltager i dette events. Først skal de afmelds under deltager')
    }
    else {
      let dialogRef = this.dialog.open(SletDialogBoxComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.restApi.deleteData(id, this.endpointE).subscribe((data) => {
            // console.log('delete:', id);
            this.onHentEvents();
          })
        }
      });
    }
  }

  onOpdaterEvent(id: any) {
    localStorage.setItem('eventsId', JSON.stringify(id));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = 'auto';
    this.dialogRefOpdaterEvents = this.dialog.open(UpdateEventsDialogBoxComponent, dialogConfig);
    this.dialogRefOpdaterEvents.afterClosed().subscribe(result => {
      if (result) {
        this.eventListe = result;
        // console.log('date:', typeof (this.eventListe.startDato));
        this.restApi.updateData(id, this.endpointE, this.eventListe).subscribe((data) => {
        })
      }
      this.ngOnInit();
    })
  }

  onOpretEvent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = 'auto';
    this.dialogRefOpretEvents = this.dialog.open(OpretteEventsDialogBoxComponent, dialogConfig);
    this.dialogRefOpretEvents.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  /* onJoinEvent(id:any){
    console.log('eventsId ', id)
  } */
}