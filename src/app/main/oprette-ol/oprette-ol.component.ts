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
  @Input() beerCreation = { name: '', type: '', taste: '', procentage: null, country: '', breweryId: null, label: '', description:'', quantity: '', vintage: '' };
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
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      taste: new FormControl('', Validators.required),
      procentage: new FormControl('', Validators.required),
      breweryId: new FormControl('', Validators.required),
      vintage: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      process: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      // billed: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });
  }

  onCancel() {
        return this.router.navigate(['../main/catalog']);
  };
  onSubmitCertificate(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.beerCreation.label = e.target.result;
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
      this.beerCreation.label = '';
    }
  };
  onSubmitBeer() {
    this.beerCreation.breweryId = JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    console.log(this.beerCreation);
    this.restApi.createData(this.beerCreation, this.endpointO).subscribe((data) => {
      this.router.navigate(['../main/catalog']);
    });
  }
}