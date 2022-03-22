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
  beerId = this.actRoute.snapshot.params['id'];
  updateForm: FormGroup;
  endpoints = '/Beers';
  beerList : any = {};
  constructor(
    public restApi: RestApiService, 
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      taste: new FormControl(''),
      procentage: new FormControl(''),
      breweryId: new FormControl(''),
      vintage: new FormControl('', Validators.required),
      country: new FormControl(''),
      // process: new FormControl('', Validators.required),
      label: new FormControl(''),
      description: new FormControl(''),
      // billed: new FormControl('', Validators.required),
      qauntity: new FormControl(''),
    });
  }

  onLoadBeer(){
    return this.restApi.getData(this.beerId, this.endpoints).subscribe((beer: {}) => {
      this.beerList = beer;
    });
  }

  onCancel() {
    return this.router.navigate(['../main/cooperationpage'])
  };

  onSubmitBeer() {
    this.restApi.updateData(this.beerId, this.endpoints, this.beerList).subscribe((data) => {
      this.router.navigate(['../main/cooperationpage'])
    });
  }
}