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
  @Input() forumOprettelse = {titel: '', indhold: ''};

  CreateForm: any = new FormGroup({});
  endpointE = '/Events';
  eventsList:any;
  eventBilled:any;
  constructor(
    public dialogRefOpretteEvents : MatDialogRef<OpretForumDialogBoxComponent>,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      indhold: new FormControl('', Validators.required)
    });
  }

  onSubmitEvent() {
    console.log(this.forumOprettelse);
    this.restApi.createData(this.forumOprettelse, this.endpointE).subscribe((data) => {
      console.log('Opret nyt forum:', data);
      this.dialogRefOpretteEvents.close();
      // this.router.navigate(['../events/events'])
    })
  }
}