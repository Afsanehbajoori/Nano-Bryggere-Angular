import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-samarbejde-rediger',
  templateUrl: './samarbejde-rediger.component.html',
  styleUrls: ['./samarbejde-rediger.component.css']
})
export class SamarbejdeRedigerComponent implements OnInit {
  selected = '';
  olId = this.actRoute.snapshot.params['id'];
  opdaterForm: FormGroup;
  endpoints = '/Øller';
  olListe: any = {};
  constructor(
    public restApi: RestApiService, 
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.opdaterForm = new FormGroup({
      navn: new FormControl(''),
      type: new FormControl(''),
      smag: new FormControl(''),
      procent: new FormControl(''),
      bryggeriId: new FormControl(''),
      argang: new FormControl('', Validators.required),
      land: new FormControl(''),
      // process: new FormControl('', Validators.required),
      olBilled: new FormControl(''),
      beskrivelse: new FormControl(''),
      // billed: new FormControl('', Validators.required),
      antal: new FormControl(''),
    });
  }

  onHentOl(){
    return this.restApi.getData(this.olId, this.endpoints).subscribe((beer: {}) => {
      this.olListe = beer;
    });
  }

  onAnuller() {
    return this.router.navigate(['../main/samarbejdeside'])
  };

  onSubmitOl() {
    this.restApi.updateData(this.olId, this.endpoints, this.olListe).subscribe((data) => {
      this.router.navigate(['../main/samarbejdeside'])
    });
  }
}