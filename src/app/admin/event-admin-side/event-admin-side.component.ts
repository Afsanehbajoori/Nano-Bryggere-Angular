import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { RedigerBryggeriDialogBoxComponent } from 'src/app/main/rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
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
  dialogRefDelete: MatDialogRef<SletDialogBoxComponent>;
  dialogRefCreateEvents : MatDialogRef<OpretteEventsDialogBoxComponent>;
  dialogRefUpdateEvents : MatDialogRef<UpdateEventsDialogBoxComponent>;
  searchkeyEventtitle:string;
  searchkeyParticipants:string;
  clickButton:boolean=true;
  eventList:any;
  events:Events[];
  //event = new Events();
  endpointE = '/Events';
  endpointP='/Deltageres';
  id = this.actRoute.snapshot.params['id'];
  listParticipants:any;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.onloadEvents();
    this.onloadParticipation()
  }

  onloadEvents(){
    return this.restApi.getDatas(this.endpointE).subscribe(event => {
      this.events=event;
    })
  }
  onloadParticipation(){
    this.restApi.getDatas(this.endpointP).subscribe(data => {
      this.listParticipants=data
      console.log('del:', this.listParticipants)
    })
  }

  onShowEvent(id:any){
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointE).subscribe(data => {
      this.eventList=data;
      console.log('eventList:',this.eventList);
    })
  }

  onFindEventtitle(){
    if(this.searchkeyEventtitle == ""){
      this.ngOnInit();
    }
    else{
      this.events = this.events.filter(res =>{
      return  res.title.toLowerCase().match(this.searchkeyEventtitle.toLowerCase());
      })
    }
  }

  onFindParticipants(){
    if(this.searchkeyParticipants == ""){
      this.ngOnInit();
    }
    else{
       this.restApi.getEventParticipantsByUsername(this.searchkeyParticipants.toLowerCase() , this.endpointE).subscribe((data) => {
         console.log('deltag:', data)
        return this.events=data;
      })
        }
  }

  onDeleteEvent(id:any){
    if(this.listParticipants.length !==0){
      alert('der er nogle er deltger i dette events . Først skal afmeld under deltager')
    }
    else{
      let dialogRef = this.dialog.open(SletDialogBoxComponent);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.restApi.deleteData(id , this.endpointE).subscribe((data) => {
            console.log('delete:' , id);
            this.onloadEvents();
          })
        }
      });
    }
  }

  onUpdateEvent(id:any){
    localStorage.setItem('eventsId' ,JSON.stringify(id));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height= 'auto';
    this.dialogRefUpdateEvents = this.dialog.open(UpdateEventsDialogBoxComponent , dialogConfig);
    this.dialogRefUpdateEvents.afterClosed().subscribe(result => {
      if (result) {
        this.eventList = result;
        console.log('date:', typeof(this.eventList.startDato) );
        this.restApi.updateData(id, this.endpointE, this.eventList).subscribe((data) => {
        })
      }
      this.ngOnInit();
    })
  }

  onCreateEvent(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height= 'auto';
    this.dialogRefCreateEvents = this.dialog.open(OpretteEventsDialogBoxComponent , dialogConfig);
    this.dialogRefCreateEvents.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  /* onJoinEvent(id:any){
    console.log('eventsId ', id)
  } */
}