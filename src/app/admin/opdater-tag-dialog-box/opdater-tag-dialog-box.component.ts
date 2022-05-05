import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Tags } from 'src/app/Models/Tags';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-opdater-tag-dialog-box',
  templateUrl: './opdater-tag-dialog-box.component.html',
  styleUrls: ['./opdater-tag-dialog-box.component.css']
})
export class OpdaterTagDialogBoxComponent implements OnInit {
  opdaterForm: FormGroup = new FormGroup({});
  tagListe: Tags;
  tagId: number;
  endpointT = '/Tags';

  constructor(
    public dialogRefOpdaterTag: MatDialogRef<OpdaterTagDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService,
  ) { }

  ngOnInit(): void {
    this.tagId = JSON.parse(localStorage.getItem('tagId') || '{}');
    this.restApi.getData(this.tagId, this.endpointT)
      .toPromise()
      .then(data => {
        this.tagListe = data;
        this.opdaterForm = this.formBuilder.group({
          navn: new FormControl(this.tagListe.navn),
        })
      })
  }
}
