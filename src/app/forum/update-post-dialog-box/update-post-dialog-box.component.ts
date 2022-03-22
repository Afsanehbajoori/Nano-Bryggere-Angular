import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-update-post-dialog-box',
  templateUrl: './update-post-dialog-box.component.html',
  styleUrls: ['./update-post-dialog-box.component.css']
})
export class UpdatePostDialogBoxComponent implements OnInit {
  updateForm: FormGroup = new FormGroup({});
  updatePost:any;
  endpointP = '/Posts';
  postId:number;

  constructor( public dialogRefUpdatePost : MatDialogRef<UpdatePostDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId=JSON.parse(localStorage.getItem('postId') || '{}');
    this.restApi.getData(this.postId , this.endpointP)
    .toPromise()
    .then(data => {
      this.updatePost= data ;
      this.updateForm = this.formBuilder.group({
        title : new FormControl(this.updatePost.title),
        content : new FormControl(this.updatePost.content)
      })
    })
  }
}