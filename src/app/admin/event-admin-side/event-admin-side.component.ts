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
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefOpretteEvents : MatDialogRef<OpretteEventsDialogBoxComponent>;
  dialogRefUpdateEvents : MatDialogRef<UpdateEventsDialogBoxComponent>;
  searchkeyEventtitel:string;
  searchkeyDeltagelser:string;
  clickButton:boolean=true;
  eventList:any;
  events:Events[];
  //event = new Events();
  endpointE = '/Events';
  endpointD='/Deltageres';
  id = this.actRoute.snapshot.params['id'];



  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(){
    return this.restApi.getDatas(this.endpointE).subscribe(event => {
      this.events=event;
      //console.log(this.events);

    })
  }

  onVisEvent(id:any){
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointE).subscribe(data => {
      this.eventList=data;
      //console.log(this.eventList);
    })

  }

  onFindEventtitel(){
    if(this.searchkeyEventtitel == ""){
      this.ngOnInit();
    }
    else{
      this.events = this.events.filter(res =>{
      return  res.titel.toLowerCase().match(this.searchkeyEventtitel.toLowerCase());

      })
    }

  }

  onFindDeltagelser(){
    if(this.searchkeyDeltagelser == ""){
      this.ngOnInit();
    }
    else{
       this.restApi.getEventDeltagelserByBrugernavn(this.searchkeyDeltagelser.toLowerCase() , this.endpointE).subscribe((data) => {
         console.log('deltag:', data)
        return this.events=data;
      })
        }
  }


  //skal kigge på det efter styre på deltager
  onSletEvent(id:any){
/*     let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.restApi.deleteData(id , this.endpointE).subscribe((data) => {
          console.log('delete:' , id);
          this.loadEvents();
        })
      }
    }); */

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
        this.restApi.updateData(id, this.endpointE, this.eventList).subscribe((data) => {
          //console.log(this.eventList);
        })
      }
      this.ngOnInit();
    })

  }

  onOpretteEvent(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height= 'auto';
    this.dialogRefOpretteEvents = this.dialog.open(OpretteEventsDialogBoxComponent , dialogConfig);
    this.dialogRefOpretteEvents.afterClosed().subscribe(result => {
      this.ngOnInit();
    })

  }

  onAfmeldDeltagelse(id:any){
    

  }


}
