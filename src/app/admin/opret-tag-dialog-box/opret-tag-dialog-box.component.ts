import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-opret-tag-dialog-box',
  templateUrl: './opret-tag-dialog-box.component.html',
  styleUrls: ['./opret-tag-dialog-box.component.css']
})
export class OpretTagDialogBoxComponent implements OnInit {
  @Input() tagOprettelse = { navn: '' };
  opretForm: FormGroup;
  endpointT = '/Tags';
  constructor(
    public dialogRefOpretTag : MatDialogRef<OpretTagDialogBoxComponent>,
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.opretForm = new FormGroup({
      navn: new FormControl('')
    })
  }

  onSubmitTag() {
    this.restApi.createData(this.tagOprettelse, this.endpointT).subscribe((data) => {
      this.dialogRefOpretTag.close();
      // this.router.navigate(['../events/events'])
    })
    // this.restApi.createData(this.opretForm, this.endpointT).subscribe((data) => {
    //   this.router.navigate(['../admin/tags-admin']);
    // });
  }
}
