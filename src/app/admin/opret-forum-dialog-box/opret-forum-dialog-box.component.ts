import { Component, OnInit ,Input} from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-opret-forum-dialog-box',
  templateUrl: './opret-forum-dialog-box.component.html',
  styleUrls: ['./opret-forum-dialog-box.component.css']
})
export class OpretForumDialogBoxComponent implements OnInit {
  @Input() forumOprettelse = {titel: '', beskrivelse: '', oprettet:'', brugerId: 0};

  CreateForm: any = new FormGroup({});
  endpointF = '/Forumer';
  eventsList:any;
  eventBilled:any;
  brugerId:any;
  constructor(
    public dialogRefOpretteEvents : MatDialogRef<OpretForumDialogBoxComponent>,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      oprettet: new FormControl('', Validators.required)
    });
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
  }

  onSubmitEvent() {
    this.forumOprettelse.brugerId = this.brugerId;
    console.log(this.forumOprettelse);
    this.restApi.createData(this.forumOprettelse, this.endpointF).subscribe((data) => {
      console.log('Opret nyt forum:', data);
      this.dialogRefOpretteEvents.close();
      // this.router.navigate(['../events/events'])
    })
  }
}