import { NgStyle } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Deltagere } from 'src/app/Models/Deltagere';
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
  endpointD = '/Deltageres';
  searchkey: string;
  buttonDisabled: boolean ;
  buttonEnabled: boolean;
  eventsId:number;
  brugerId:number;
  listDeltagelser:any;
  clickButton:boolean = true;
  eventList:any;
  id = this.actRoute.snapshot.params['id'];
  arrayListDeltager = new Array();
  deltagId:number;
  list:any;
  isDeltage:boolean;
 @Input() deltage = { brugerId:0 , eventsId:0 , isDeltage:false}



  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
    this.loadEvent();
    this.loadDeltaglser();
  }

  loadEvent() {
    return this.restApi.getDatas(this.endpointE).subscribe((data) => {
      this.events = data;
  });
  }

  loadDeltaglser(){
    this.restApi.getDatas(this.endpointD).subscribe(data => {
      this.listDeltagelser=data;
      if(this.brugerId){
        this.listDeltagelser = this.listDeltagelser.filter((a:any) => a.brugerId === this.brugerId);
        console.log('list:' , this.listDeltagelser);
        for(var d =0; d < this.listDeltagelser.length ; d++)
        {
          console.log('listId:' , this.listDeltagelser[d].eventsId);
          if(this.listDeltagelser[d].eventsId){
            this.arrayListDeltager.push(this.listDeltagelser[d].eventsId);

          }
        }
      }
   })

  }

 onViseEvent(id:any){
    this.clickButton=false;
    return this.restApi.getData(id , this.endpointE).subscribe(data => {
      this.eventList=data;
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


  onJoinEvent(id:any){
    if(this.arrayListDeltager.includes(id) )
    {
      this.dialog.open(MessageDialogBoxComponent);
    }else{
        this.deltage.brugerId=this.brugerId;
        this.deltage.eventsId=id;
        this.deltage.isDeltage=true;
        this.restApi.createData(this.deltage , this.endpointD ).subscribe(data => {
          this.loadDeltaglser();
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
