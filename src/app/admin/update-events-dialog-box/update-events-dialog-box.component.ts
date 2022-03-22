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
  updateForm: FormGroup = new FormGroup({});
  eventsList:any;
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
      this.eventsList= data ;

      this.updateForm = this.formBuilder.group({
        eventPicture : new FormControl(this.eventsList.eventPicture),
        title : new FormControl(this.eventsList.title),
        description: new FormControl(this.eventsList.description),
        startDate: new FormControl(this.eventsList.startDate),
        endDate: new FormControl(this.eventsList.endDate),
        location: new FormControl(this.eventsList.location),
      })
    })
  }
  
  onSubmitCertificate(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.eventsList.eventPicture =e.target.result;
        console.log( this.eventsList.eventPicture);
        localStorage.setItem('eventPicture' ,JSON.stringify(this.eventsList.eventPicture));
      }
    }
  };
}