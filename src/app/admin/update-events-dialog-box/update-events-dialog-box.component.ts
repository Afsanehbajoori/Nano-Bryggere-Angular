import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-update-events-dialog-box',
  templateUrl: './update-events-dialog-box.component.html',
  styleUrls: ['./update-events-dialog-box.component.css']
})
export class UpdateEventsDialogBoxComponent implements OnInit {
  opdaterForm: FormGroup = new FormGroup({});
  eventsListe:any;
  endpointE= '/Events';
  eventsId : number;

  constructor(
    public dialogRefUpdateEvents : MatDialogRef<UpdateEventsDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.eventsId=JSON.parse(localStorage.getItem('eventsId') || '{}');
    console.log('eventsId:', this.eventsId);
    this.restApi.getData(this.eventsId , this.endpointE)
    .toPromise()
    .then(data => {
      this.eventsListe= data ;

      this.opdaterForm = this.formBuilder.group({
        eventBilled : new FormControl(this.eventsListe.eventBilled),
        titel : new FormControl(this.eventsListe.titel),
        beskrivelse: new FormControl(this.eventsListe.beskrivelse),
        startDato: new FormControl(this.eventsListe.startDato),
        slutDato: new FormControl(this.eventsListe.slutDato),
        lokation: new FormControl(this.eventsListe.lokation),
      })
    })
  }
  
  onSubmitCertifikat(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.eventsListe.eventBilled =e.target.result;
        console.log( this.eventsListe.eventBilled);
        localStorage.setItem('eventBilled' ,JSON.stringify(this.eventsListe.eventBilled));
      }
    }
  };
}