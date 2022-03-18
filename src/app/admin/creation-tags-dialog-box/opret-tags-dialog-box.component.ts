import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-opret-tags-dialog-box',
  templateUrl: './opret-tags-dialog-box.component.html',
  styleUrls: ['./opret-tags-dialog-box.component.css']
})
export class OpretTagsDialogBoxComponent implements OnInit {
  @Input() tagCreation = {name:''};
  
  CreateForm: any = new FormGroup({});
  endpointT = '/Tags';
  constructor(
    public dialogRefCreateTags : MatDialogRef<OpretTagsDialogBoxComponent>,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  onSubmitTag() {
    console.log(this.tagCreation);
    this.restApi.createData(this.tagCreation, this.endpointT).subscribe((data) => {
      console.log('oprette ny event:' , data);
      this.dialogRefCreateTags.close();
      // this.router.navigate(['../events/events'])
    })
  }
}
