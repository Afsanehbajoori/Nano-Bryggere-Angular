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
  @Input() eventOprettelse = {eventBilled:'', titel: '', beskrivelse: '',  lokation: '' ,startDato:'',slutDato:'' };


  OpretForm: any = new FormGroup({});
  endpointE = '/Events';
  eventsList:any;
  eventBilled:any;
  constructor(
    public dialogRefOpretteEvents : MatDialogRef<OpretteEventsDialogBoxComponent>,
    public restApi: RestApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.OpretForm = new FormGroup({
      eventBilled: new FormControl(''),
      titel: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      startDato: new FormControl('', Validators.required),
      slutDato: new FormControl('', Validators.required),
      lokation: new FormControl('', Validators.required)
    });
  }

  onSubmitCertifikats(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.eventBilled = e.target.result;
        console.log(this.eventBilled);
        localStorage.setItem('eventBilled', JSON.stringify(this.eventBilled));
      }
    }
  };

  onSubmitEvent() {
    console.log(this.eventOprettelse);
    this.eventOprettelse.eventBilled=JSON.parse(localStorage.getItem('eventBilled')|| '{}');
    console.log('image:', this.eventOprettelse.eventBilled);
    this.restApi.createData(this.eventOprettelse, this.endpointE).subscribe((data) => {
      console.log('oprette ny event:' , data);
      this.dialogRefOpretteEvents.close();
      // this.router.navigate(['../events/events'])
    })
  }

}
