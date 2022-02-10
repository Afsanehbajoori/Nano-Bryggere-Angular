import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-rediger-ol',
  templateUrl: './rediger-ol.component.html',
  styleUrls: ['./rediger-ol.component.css']
})
export class RedigerOlComponent implements OnInit {
  @Input() olRediger = { navn: '', type: '', smag: '', procent: null, land: '', bryggeriId: null, etiket: '', beskrivelse: '' };

  RedigerForm: FormGroup;
  beer = new Øl;
  beers: Øl[];
  endpoints = '/Øller';
  olId: any;
  olList : any;
  
  constructor(
    public restApi: RestApiService, 
    private router: Router,
    public actRoute: ActivatedRoute) 
    {  
    this.olId = this.actRoute.snapshot.params.id;
    }
  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.olId = params.get('id');
    });
    
    this.RedigerForm = new FormGroup({
      navn: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      smag: new FormControl('', Validators.required),
      procent: new FormControl('', Validators.required),
      bryggerid: new FormControl('', Validators.required),
      // argang: new FormControl('', Validators.required),
      land: new FormControl('', Validators.required),
      // process: new FormControl('', Validators.required),
      etiket: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      // billed: new FormControl('', Validators.required)
    });
    this.loadOl();
  }
  
  loadOl(){
    return this.restApi.getData(this.olId, this.endpoints).subscribe((beer) => {
      this.olList = beer;
    console.log(this.olList);
    });

  }

  onAnnullerOl() {
    return this.router.navigate(['../main/katalog'])
  };

  onSubmitOl() {
    this.beers = this.olRediger;
    console.log(this.olRediger);
    this.restApi.updateData(this.olId, this.endpoints, this.beers).subscribe((data) => {
      console.log(data);
      this.router.navigate(['../main/katalog'])
    })
  }
}