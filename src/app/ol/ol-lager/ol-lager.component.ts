import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-ol-lager',
  templateUrl: './ol-lager.component.html',
  styleUrls: ['./ol-lager.component.css']
})
export class OlLagerComponent implements OnInit {
  // @Input() lagerInput = { antal: 0, flaskeAntal: 0, tondeAntal: 0 };

  LayerForm: FormGroup;
  endpointO = '/Beers';
  selected = '';
  beer: any;
  beerid = this.actRoute.snapshot.params['id'];
  beerList : any = {};
  constructor(
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.LayerForm = new FormGroup({
      quantity: new FormControl('', Validators.required),
      bottleQuantity: new FormControl('', Validators.required),
      barrelQuantity: new FormControl('', Validators.required),
      bottleResevationQuantity: new FormControl('', Validators.required)
    });
    this.onLoadBeer();
  }
  onLoadBeer(){  
    return this.restApi.getData(this.beerid, this.endpointO).subscribe((beerInfo: {}) => {
      this.beerList = beerInfo;
    });
  }
  onCancel() {
    return this.router.navigate(['../main/catalog']);
  };

  onSubmitBeer() {
    this.restApi.updateData(this.beerid, this.endpointO, this.beerList).subscribe((data) => {
      this.router.navigate(['../main/catalog']);
    });
  }
}