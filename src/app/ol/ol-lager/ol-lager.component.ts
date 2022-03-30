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

  LagerForm: FormGroup;
  endpointO = '/Øller';
  selected = '';
  ol: any;
  olId = this.actRoute.snapshot.params['id'];
  olListe : any = {};
  constructor(
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.LagerForm = new FormGroup({
      antal: new FormControl('', Validators.required),
      flaskeAntal: new FormControl('', Validators.required),
      tondeAntal: new FormControl('', Validators.required),
      flaskeResevationAntal: new FormControl('', Validators.required)
    });
    this.onHentOl();
  }
  onHentOl(){  
    return this.restApi.getData(this.olId, this.endpointO).subscribe((beerInfo: {}) => {
      this.olListe = beerInfo;
    });
  }
  onAnuller() {
    return this.router.navigate(['../main/katalog']);
  };

  onSubmitOl() {
    this.restApi.updateData(this.olId, this.endpointO, this.olListe).subscribe((data) => {
      this.router.navigate(['../main/katalog']);
    });
  }
}