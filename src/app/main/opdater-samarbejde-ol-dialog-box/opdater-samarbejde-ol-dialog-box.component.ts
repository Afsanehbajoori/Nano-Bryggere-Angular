import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OpdaterSamarbejdeDialogBoxComponent } from 'src/app/admin/opdater-samarbejde-dialog-box/opdater-samarbejde-dialog-box.component';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-opdater-samarbejde-ol-dialog-box',
  templateUrl: './opdater-samarbejde-ol-dialog-box.component.html',
  styleUrls: ['./opdater-samarbejde-ol-dialog-box.component.css']
})
export class OpdaterSamarbejdeOlDialogBoxComponent implements OnInit {
  opdaterForm: FormGroup = new FormGroup({});
  olListe: Øl;
  brugerListe:any;
  olId: number;
  samarbejdeId:number;
  endpointO = '/Øller';
  endpointS= '/Samarbejde';
  constructor(
      public dialogRefUpdateProfile: MatDialogRef<OpdaterSamarbejdeDialogBoxComponent>,
      private formBuilder: FormBuilder,
      public restApi: RestApiService) { }

  ngOnInit(): void {
    this.olId = JSON.parse(localStorage.getItem('ølId') || '{}');
    // this.samarbejdeId = JSON.parse(localStorage.getItem('samarbejdeId') || '{}');
    this.restApi.getData(this.olId, this.endpointO)
      .toPromise()
      .then(olData => {
        this.olListe = olData;
        /*
        this.restApi.getData(this.samarbejdeId , this.endpointS).subscribe(res => {
          this.BrugerList=res; */
          // build the edit form
          this.opdaterForm = this.formBuilder.group({
            navn: new FormControl(this.olListe.navn),
            type: new FormControl(this.olListe.type),
            land: new FormControl(this.olListe.land),
            procent: new FormControl(this.olListe.procent),
            smag: new FormControl(this.olListe.smag),
            beskrivelse: new FormControl(this.olListe.beskrivelse),
            olBilled: new FormControl(this.olListe.olBilled),
            argang: new FormControl(this.olListe.argang),
            antal: new FormControl(this.olListe.antal),
          });
        // })
      });
  }
  onTilfojOlBilled(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.olListe.olBilled = e.target.result;
      reader.readAsDataURL(event.target.files[0])
    }
    else{
      this.olListe.olBilled = '';
    }
  };
}