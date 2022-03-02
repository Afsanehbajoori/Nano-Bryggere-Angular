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
  @Input() lagerInput = { antal: 0 };
  LagerForm: FormGroup;
  endpoints = '/Øller';
  selected = '';
  constructor(
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.LagerForm = new FormGroup({
      antal: new FormControl('', Validators.required)
    });
  }

  onAnnullerOl() {
    return this.router.navigate(['../main/katalog']);
  };

  onSubmitOl() {
    this.restApi.createData(this.lagerInput, this.endpoints).subscribe((data) => {
      this.router.navigate(['../main/katalog']);
    });
  }
}
