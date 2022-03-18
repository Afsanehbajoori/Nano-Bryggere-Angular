import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-update-tags-dialog-box',
  templateUrl: './update-tags-dialog-box.component.html',
  styleUrls: ['./update-tags-dialog-box.component.css']
})
export class UpdateTagsDialogBoxComponent implements OnInit {
  updateTags: FormGroup = new FormGroup({});
  tagsList:any;
  endpointT= '/Tags';
  tagId : number;
  constructor(
    public dialogRefUpdateTags : MatDialogRef<UpdateTagsDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService,
  ) { }

  ngOnInit(): void {
    this.tagId=JSON.parse(localStorage.getItem('tagsId') || '{}');
    console.log('eventsId:', this.tagId);
    this.restApi.getData(this.tagId , this.endpointT)
    .toPromise()
    .then(data => {
      this.tagsList= data ;

      this.updateTags = this.formBuilder.group({
        name : new FormControl(this.tagsList.eventBilled),
      })
    })
  }
  onSubmitCertificate(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.tagsList.eventBilled =e.target.result;
        console.log( this.tagsList.eventBilled);
        localStorage.setItem('eventBilled' ,JSON.stringify(this.tagsList.eventBilled));
      }
    }
  };
}
