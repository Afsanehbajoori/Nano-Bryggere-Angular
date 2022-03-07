import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-oprette-ol',
  templateUrl: './oprette-ol.component.html',
  styleUrls: ['./oprette-ol.component.css']
})
export class OpretteOlComponent implements OnInit {
  @Input() olOprettelse = { navn: '', type: '', smag: '', procent: null, land: '', bryggeriId: null, etiket: '', beskrivelse:'', antal: '', argang: '' };
  // @Input() olOprettelse = { navn: '', type: '', smag: '', procent: null, land: '', bryggeriId: null, argang: 0, etiket: '', beskrivelse:'', antal: '' };
  OpretForm : FormGroup;
  endpoints = '/Øller';
  selected = '';
  constructor(
    public restApi: RestApiService, 
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.OpretForm = new FormGroup({
      navn: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      smag: new FormControl('', Validators.required),
      procent: new FormControl('', Validators.required),
      bryggerid: new FormControl('', Validators.required),
      argang: new FormControl('', Validators.required),
      land: new FormControl('', Validators.required),
      process: new FormControl('', Validators.required),
      etiket: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      // billed: new FormControl('', Validators.required),
      antal: new FormControl('', Validators.required)
    });
  }

  onAnnullerOl() {
        return this.router.navigate(['../main/katalog']);
  };
  onSubmitCertifikats(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.olOprettelse.etiket = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      // var reader = new FileReader();
      // reader.readAsDataURL(event.target.files[0]);
      // reader.onload = (e: any) => {
      //   this.olOprettelse.etiket = e.target.result;
      //   console.log(this.olOprettelse.etiket);
      //   localStorage.setItem('logo', JSON.stringify(this.olOprettelse.etiket));
      // }
    }
    else{
      this.olOprettelse.etiket = '';
    }
  };
  onSubmitOl() {
    this.olOprettelse.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    console.log(this.olOprettelse);
    this.restApi.createData(this.olOprettelse, this.endpoints).subscribe((data) => {
      this.router.navigate(['../main/katalog']);
    });
  }
}
