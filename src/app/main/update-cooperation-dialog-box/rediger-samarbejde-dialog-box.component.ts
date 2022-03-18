import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-rediger-samarbejde-dialog-box',
  templateUrl: './rediger-samarbejde-dialog-box.component.html',
  styleUrls: ['./rediger-samarbejde-dialog-box.component.css']
})
export class RedigerSamarbejdeDialogBoxComponent implements OnInit {
  RedigerBeer: FormGroup = new FormGroup({});
  beerListe: any;
  beerId: number;
  endpointo = '/Øller';
  constructor(
    public dialogRefRedigerSamarbejde: MatDialogRef<RedigerSamarbejdeDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService
  ) { }

  ngOnInit(): void {
    this.beerId = JSON.parse(localStorage.getItem('sOlId') || '{}');
    this.restApi.getData(this.beerId, this.endpointo).toPromise().then(data => {
      this.beerListe = data;
      this.RedigerBeer = this.formBuilder.group({
        Navn: new FormControl(this.beerListe.navn),
        Type: new FormControl(this.beerListe.type),
        Smag: new FormControl(this.beerListe.smag),
        Procent: new FormControl(this.beerListe.procent),
        Argang: new FormControl(this.beerListe.argang),
        Land: new FormControl(this.beerListe.land),
        Process: new FormControl(this.beerListe.process),
        Etiket: new FormControl(this.beerListe.etiket),
        beskrivelse : new FormControl(this.beerListe.beskrivelse)
      });
    });
  }
}