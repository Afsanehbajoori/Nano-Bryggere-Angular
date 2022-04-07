import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Forum } from 'src/app/Models/Forum';
import { Tags } from 'src/app/Models/Tags';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-opdater-forum-dialog-box',
  templateUrl: './opdater-forum-dialog-box.component.html',
  styleUrls: ['./opdater-forum-dialog-box.component.css']
})
export class OpdaterForumDialogBoxComponent implements OnInit {
  opdaterForm: FormGroup = new FormGroup({});
  forumListe: Forum;
  forumId: number;
  endpointF = '/Forumer';

  constructor(
    public dialogRefOpdaterTag: MatDialogRef<OpdaterForumDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService,
  ) { }

  ngOnInit(): void {
    this.forumId = JSON.parse(localStorage.getItem('forumId') || '{}');
    console.log('forumId:', this.forumId);
    this.restApi.getData(this.forumId, this.endpointF)
      .toPromise()
      .then(data => {
        this.forumListe = data;
        this.opdaterForm = this.formBuilder.group({
          navn: new FormControl(this.forumListe.titel),
        })
      })
  }

}
