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
  @Input() olOprettelse = { navn: '', type: '', smag: '', procent: null, land: '', bryggeriId: null, olBilled: '', beskrivelse:'', antal: '', argang: '' };
  // @Input() olOprettelse = { navn: '', type: '', smag: '', procent: null, land: '', bryggeriId: null, argang: 0, etiket: '', beskrivelse:'', antal: '' };
  opretForm : FormGroup;
  endpointB = '/Øller';
  selected = '';
  constructor(
    public restApi: RestApiService, 
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.opretForm = new FormGroup({
      navn: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      smag: new FormControl('', Validators.required),
      procent: new FormControl('', Validators.required),
      bryggeriId: new FormControl('', Validators.required),
      argang: new FormControl('', Validators.required),
      land: new FormControl('', Validators.required),
      process: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      // olBilled: new FormControl('', Validators.required),
      antal: new FormControl('', Validators.required)
    });
  }

  onAnuller() {
        return this.router.navigate(['../main/katalog']);
  };
  onSubmitCertifikat(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.olOprettelse.olBilled = e.target.result;
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
      this.olOprettelse.olBilled = '';
    }
  };
  onSubmitOl() {
    this.olOprettelse.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    // console.log(this.olOprettelse);
    this.restApi.createData(this.olOprettelse, this.endpointB).subscribe((data) => {
      this.router.navigate(['../main/katalog']);
    });
  }
}