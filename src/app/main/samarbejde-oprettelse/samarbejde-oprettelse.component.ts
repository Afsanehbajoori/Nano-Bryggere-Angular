import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-samarbejde-oprettelse',
  templateUrl: './samarbejde-oprettelse.component.html',
  styleUrls: ['./samarbejde-oprettelse.component.css']
})
export class SamarbejdeOprettelseComponent implements OnInit {
  @Input() nySamarbejde = { olBilled: '', titel: '', bryggeriId1: 0, bryggeriId2: 0 }
  opretForm: any = new FormGroup({});
  olBilled: any;
  bryggeriId: number;
  endpointS = '/Samarbejder';
  endpointB = '/Bryggerier';
  endpointO = '/Øller';
  bryggeriList: any;
  bryggeriNavn = new Array();
  samarbejdeId: number;
  constructor(
    public dialogRefOpretSamarbejde: MatDialogRef<SamarbejdeOprettelseComponent>,
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.onHentBryggeri();

    this.opretForm = this._formBuilder.group({
      'olBilled': new FormControl(''),
      'titel': new FormControl('', Validators.required),
      'bryggeriId1': new FormControl(''),
      'bryggeriId2': new FormControl(''),
      //'olId': new FormControl('')
    })
  }

  onHentBryggeri() {
    this.restApi.getDatas(this.endpointB).subscribe(data => {
      this.bryggeriList = data;
      for (let i = 0; i < data.length; i++) {
        const dropdownInfo = { bryggeinavn: this.bryggeriList[i].navn, bryggeriId2: this.bryggeriList[i].id }
        if(this.bryggeriId != dropdownInfo.bryggeriId2){
          this.bryggeriNavn.push(dropdownInfo)
        }
      }
    })
  }

  onAnuller() {
    this.opretForm.reset();
    this.router.navigate(['/main/samarbejds-side'])
  }

  onSubmitProfilBilled(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.olBilled = e.target.result;
        localStorage.setItem('olBilled', JSON.stringify(this.olBilled));
      }
    }
  };

  onSubmitSamarbejde() {
    this.nySamarbejde.olBilled = JSON.parse(localStorage.getItem('olBilled') || '{}');
    this.nySamarbejde.bryggeriId1 = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    this.restApi.getDatas(this.endpointS).subscribe(data => {
      if (this.nySamarbejde.bryggeriId1 == data.bryggeriId1 && this.nySamarbejde.bryggeriId2 == data.bryggeriId2) {
        this.restApi.createData(this.nySamarbejde, this.endpointS).subscribe(data => {
          localStorage.setItem('samarbejdeId', JSON.stringify(data.id))
          this.dialogRefOpretSamarbejde.close();
          this.ngOnInit();
        })
      }
    })
    //this.nySamarbejde.olId=JSON.parse(localStorage.getItem('olId') || '{}');
  }
}