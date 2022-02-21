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
  beerid = this.actRoute.snapshot.params['id'];
  RedigerForm: FormGroup;
  endpoints = '/Øller';
  olList : any = {};
  
  constructor(
    public restApi: RestApiService, 
    private router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.RedigerForm = new FormGroup({
      navn: new FormControl(''),
      type: new FormControl(''),
      smag: new FormControl(''),
      procent: new FormControl(''),
      bryggerid: new FormControl(''),
      // argang: new FormControl('', Validators.required),
      land: new FormControl(''),
      process: new FormControl('', Validators.required),
      etiket: new FormControl(''),
      beskrivelse: new FormControl(''),
      // billed: new FormControl('', Validators.required),
      antal: new FormControl(''),
    });
    this.loadOl();
  }
  
  loadOl(){
    return this.restApi.getData(this.beerid, this.endpoints).subscribe((beer: {}) => {
      this.olList = beer;
    });
  }

  onAnnullerOl() {
    return this.router.navigate(['../main/katalog'])
  };

  onSubmitOl() {
    this.restApi.updateData(this.beerid, this.endpoints, this.olList).subscribe((data) => {
      this.router.navigate(['../main/katalog'])
    });
  }
}