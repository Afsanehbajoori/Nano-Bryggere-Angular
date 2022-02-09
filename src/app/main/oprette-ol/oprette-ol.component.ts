import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Øl } from 'src/app/Models/Øl';
import { RestApiService } from 'src/app/shared/rest-api.service';

interface Bryg{
  value: string;
  view: string;
}

@Component({
  selector: 'app-oprette-ol',
  templateUrl: './oprette-ol.component.html',
  styleUrls: ['./oprette-ol.component.css']
})
export class OpretteOlComponent implements OnInit {
  @Input() olOpret : Øl;
  brygs: Bryg[] = [
    {value:'1', view: 'Ja'},
    {value:'2', view: 'Nej'}
  ]
  OpretForm : FormGroup;
  beertests: Øl[];
  beer = new Øl;
  endpoints = '/Øller';
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
      // argang: new FormControl('', Validators.required),
      land: new FormControl('', Validators.required),
      // process: new FormControl('', Validators.required),
      etiket: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      // billed: new FormControl('', Validators.required)
    });
  }
  // addLogin(datalogin: Login){
  //   this.restApi.createLogins(this.loginDetails).subscribe((data: {}) => {
  //     this.router.navigate(['../main/main'])
  //   })
  // }

  onSletOl() {
        return this.router.navigate(['../main/katalog'])
  };

  onSubmitOl() {
    this.beertests = this.OpretForm.value;
    console.log(this.beertests);
    this.restApi.createData(this.beertests, this.endpoints).subscribe((data : {}) => {
      return this.router.navigate(['../main/katalog'])
    })
  }
}
