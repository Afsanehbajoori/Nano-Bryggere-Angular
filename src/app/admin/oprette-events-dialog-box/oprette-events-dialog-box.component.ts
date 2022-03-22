import { Component, OnInit ,Input} from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-oprette-events-dialog-box',
  templateUrl: './oprette-events-dialog-box.component.html',
  styleUrls: ['./oprette-events-dialog-box.component.css']
})
export class OpretteEventsDialogBoxComponent implements OnInit {
  @Input() eventCreation = {eventPicture:'', title: '', description: '',  location: '' ,startDate:'',endDate:'' };

  CreateForm: any = new FormGroup({});
  endpointE = '/Events';
  eventsList:any;
  eventPicture:any;
  constructor(
    public dialogRefOpretteEvents : MatDialogRef<OpretteEventsDialogBoxComponent>,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      eventPicture: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });
  }

  onSubmitCertificate(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.eventPicture = e.target.result;
        console.log(this.eventPicture);
        localStorage.setItem('eventBilled', JSON.stringify(this.eventPicture));
      }
    }
  };

  onSubmitEvent() {
    console.log(this.eventCreation);
    this.eventCreation.eventPicture=JSON.parse(localStorage.getItem('eventBilled')|| '{}');
    console.log('image:', this.eventCreation.eventPicture);
    this.restApi.createData(this.eventCreation, this.endpointE).subscribe((data) => {
      console.log('oprette ny event:' , data);
      this.dialogRefOpretteEvents.close();
      // this.router.navigate(['../events/events'])
    })
  }
}