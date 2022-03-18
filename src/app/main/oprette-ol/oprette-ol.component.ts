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
  @Input() beerCreation = { navn: '', type: '', smag: '', procent: null, land: '', bryggeriId: null, etiket: '', beskrivelse:'', antal: '', argang: '' };
  // @Input() olOprettelse = { navn: '', type: '', smag: '', procent: null, land: '', bryggeriId: null, argang: 0, etiket: '', beskrivelse:'', antal: '' };
  createForm : FormGroup;
  endpointO = '/Øller';
  selected = '';
  constructor(
    public restApi: RestApiService, 
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
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

  onCancel() {
        return this.router.navigate(['../main/katalog']);
  };
  onSubmitCertificate(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.beerCreation.etiket = e.target.result;
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
      this.beerCreation.etiket = '';
    }
  };
  onSubmitBeer() {
    this.beerCreation.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    console.log(this.beerCreation);
    this.restApi.createData(this.beerCreation, this.endpointO).subscribe((data) => {
      this.router.navigate(['../main/katalog']);
    });
  }
}