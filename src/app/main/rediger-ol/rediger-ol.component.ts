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
  updateForm: FormGroup;
  endpoints = '/Beers';
  beerList : any;
  vintage: Date;
  constructor(
    public restApi: RestApiService, 
    private router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
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
    this.onLoadBeer();
  }
  
  onLoadBeer(){
    return this.restApi.getData(this.beerid, this.endpoints).subscribe((beer: {}) => {
      this.beerList = beer;
      this.vintage = this.beerList.vintage;
    });
  }

  onCancel() {
    return this.router.navigate(['../main/catalog'])
  };

  onSubmitBeer() {
    this.beerList.vintage = this.vintage;
    // console.log(this.beerList.vintage);
    this.restApi.updateData(this.beerid, this.endpoints, this.beerList).subscribe((data) => {
      this.router.navigate(['../main/catalog'])
    });
  }

  onSubmitCertificate(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.beerList.label = e.target.result;
      reader.readAsDataURL(event.target.files[0])
    }
    else{
      this.beerList.label = '';
    }
  };
}