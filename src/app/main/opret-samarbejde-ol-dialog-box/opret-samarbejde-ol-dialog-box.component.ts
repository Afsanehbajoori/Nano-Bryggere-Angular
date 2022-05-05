import { Component, OnInit ,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
@Component({
  selector: 'app-opret-samarbejde-ol-dialog-box',
  templateUrl: './opret-samarbejde-ol-dialog-box.component.html',
  styleUrls: ['./opret-samarbejde-ol-dialog-box.component.css']
})
export class OpretSamarbejdeOlDialogBoxComponent implements OnInit {
  @Input() olOprettelse = {olBilled:'', navn: '', beskrivelse: '',  lokation: '' , land:'', slutDato:'', samarbejdeId: null, type: '', smag: '', procent: '', antal: '', argang: null };

  opretForm: any = new FormGroup({});
  endpointO = '/Øller';
  olList:any;
  olBilled:any;

  constructor( 
    public dialogRefOpretSamarbejdeOl : MatDialogRef<OpretSamarbejdeOlDialogBoxComponent>,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.opretForm = new FormGroup({
      navn: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      smag: new FormControl('', Validators.required),
      procent: new FormControl('', Validators.required),
      samarbejdeId: new FormControl('', Validators.required),
      argang: new FormControl('', Validators.required),
      land: new FormControl('', Validators.required),
      process: new FormControl('', Validators.required),
      olBilled: new FormControl('' , Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      antal: new FormControl('', Validators.required)
    });
  }

  onSubmitOlBilled(event: any) {
    if(event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.olBilled = e.target.result;
        localStorage.setItem('olBilled', JSON.stringify(this.olBilled));
      }
    }
  };

  onSubmitOl() {
    this.olOprettelse.samarbejdeId = JSON.parse(localStorage.getItem('samarbejdeId') || '{}');
    this.olOprettelse.olBilled = JSON.parse(localStorage.getItem('olBilled') || '{}');
    this.restApi.createData(this.olOprettelse, this.endpointO).subscribe((olData) => {
      localStorage.setItem('olId', JSON.stringify(olData.id));
      this.dialogRefOpretSamarbejdeOl.close();
      //this.router.navigate(['../main/katalog']);
    });
  }
}