import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Events } from 'src/app/Models/Events';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MessageDialogBoxComponent } from '../message-dialog-box/message-dialog-box.component';

@Component({
  selector: 'app-eventkalender-side',
  templateUrl: './eventkalender-side.component.html',
  styleUrls: ['./eventkalender-side.component.css']
})
export class EventkalenderSideComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  events: Events[];
  endpointE = '/Events';
  endpointD = '/Deltager';
  searchkey: string;
  deltagene: boolean = false;
  buttonDisabled: boolean ;
  buttonEnabled: boolean;
  eventsId: number;
  brugerId: number;
  deltagerListe: any;
  clickButton: boolean = true;
  eventListe: any;
  id = this.actRoute.snapshot.params['id'];
  deltagelsesArray = new Array();
  deltagerId: number;
  liste: any;
  Deltagene:boolean;
 @Input() deltager = { brugerId:0 , eventsId:0 , erDeltagene:false}

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.onHentEvent();
    this.onHentDeltagene();
  }

  onHentEvent() {
    return this.restApi.getDatas(this.endpointE).subscribe((data) => {
      this.events = data;
  });
  }

  onHentDeltagene(){
    this.restApi.getDatas(this.endpointD).subscribe(data => {
      this.deltagerListe=data;
      if(this.brugerId){
        this.deltagerListe = this.deltagerListe.filter((a:any) => a.brugerId === this.brugerId);
        // console.log('list:' , this.deltagerListe);
        for(var d =0; d < this.deltagerListe.length ; d++)
        {
          // console.log('listId:' , this.deltagerListe[d].eventsId);
          if(this.deltagerListe[d].eventsId){
            this.deltagelsesArray.push(this.deltagerListe[d].eventsId);
          }
        }
      }
   })
  }

 onVisEvent(id:any){
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointE).subscribe(data => {
      this.eventListe=data;
    })
  }

  onFindEvent(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.events = this.events.filter(res =>{
        return res.titel.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onDeltagEvent(id:any){
    if(this.deltagelsesArray.includes(id) )
    {
      this.dialog.open(MessageDialogBoxComponent);
    }else{
        this.deltager.brugerId=this.brugerId;
        this.deltager.eventsId=id;
        this.deltager.erDeltagene=true;
        this.restApi.createData(this.deltager , this.endpointD).subscribe(data => {
          this.onHentDeltagene();
        })
    }
  }

  /* onAfmeldEvent(id:any){
    if(!this.arrayListDeltager.includes(id)){
      this.dialog.open(MessageDialogBoxComponent);
    }
    else
    {
      const deltagId=this.listDeltagelser.find((a:any) => a.brugerId === this.brugerId && a.eventsId == id);
      this.dialogRefSlet = this.dialog.open(SletDialogBoxComponent, {
        width: '300px',
        disableClose: true
      });
      this.dialogRefSlet.afterClosed().subscribe(result => {
        if (result) {
          this.restApi.deleteData(deltagId.id , this.endpointD).subscribe(data => {
              console.log('arrayList2:' , this.arrayListDeltager);
            })
      }
    })
    }
  } */
}