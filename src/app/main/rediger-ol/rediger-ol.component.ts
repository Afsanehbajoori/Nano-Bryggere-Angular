import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-rediger-ol',
  templateUrl: './rediger-ol.component.html',
  styleUrls: ['./rediger-ol.component.css']
})
export class RedigerOlComponent implements OnInit {
  selected = '';
  olId = this.actRoute.snapshot.params['id'];
  redigerForm: FormGroup;
  endpoints = '/Øller';
  olListe: any;
  argang: Date;
  constructor(
    public restApi: RestApiService, 
    private router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.redigerForm = new FormGroup({
      navn: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      smag: new FormControl('', Validators.required),
      procent: new FormControl('', Validators.required),
      bryggeriId: new FormControl('', Validators.required),
      argang: new FormControl('', Validators.required),
      land: new FormControl('', Validators.required),
      process: new FormControl('', Validators.required),
      olBilled: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      // billed: new FormControl('', Validators.required),
      antal: new FormControl('', Validators.required)
    });
    this.onHentOl();
  }
  
  onHentOl(){
    return this.restApi.getData(this.olId, this.endpoints).subscribe((beer: {}) => {
      this.olListe = beer;
      this.argang = this.olListe.vintage;
    });
  }

  onAnuller() {
    return this.router.navigate(['../main/katalog'])
  };

  onSubmitOl() {
    this.olListe.vintage = this.argang;
    // console.log(this.beerList.vintage);
    this.restApi.updateData(this.olId, this.endpoints, this.olListe).subscribe((data) => {
      this.router.navigate(['../main/katalog'])
    });
  }

  onSubmitCertifikat(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.olListe.label = e.target.result;
      reader.readAsDataURL(event.target.files[0])
    }
    else{
      this.olListe.label = '';
    }
  };
}