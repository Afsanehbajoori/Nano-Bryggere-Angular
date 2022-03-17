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
  RedigerPost: FormGroup = new FormGroup({});
  updatePost:any;
  endpointp = '/Posts';
  postId:number;

  constructor( public dialogRefUpdatePost : MatDialogRef<UpdatePostDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId=JSON.parse(localStorage.getItem('postId') || '{}');
    this.restApi.getData(this.postId , this.endpointp)
    .toPromise()
    .then(data => {
      this.updatePost= data ;

      this.RedigerPost = this.formBuilder.group({
        titel : new FormControl(this.updatePost.titel),
        indhold : new FormControl(this.updatePost.indhold)
      })
    })
  }

}
