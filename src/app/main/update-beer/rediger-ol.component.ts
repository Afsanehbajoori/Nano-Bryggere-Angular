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
  olList : any;
  argang: Date;
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
      argang: new FormControl('', Validators.required),
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
      this.argang = this.olList.årgang;
    });
  }

  onAnnullerOl() {
    return this.router.navigate(['../main/katalog'])
  };

  onSubmitOl() {
    this.olList.årgang = this.argang;
    console.log(this.olList.årgang);
    this.restApi.updateData(this.beerid, this.endpoints, this.olList).subscribe((data) => {
      this.router.navigate(['../main/katalog'])
    });
  }

  onSubmitCertifikats(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.olList.etiket = e.target.result;
      reader.readAsDataURL(event.target.files[0])
    }
    else{
      this.olList.etiket = '';
    }
  };
}