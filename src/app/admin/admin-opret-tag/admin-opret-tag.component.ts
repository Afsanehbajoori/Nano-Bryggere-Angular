import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-admin-opret-tag',
  templateUrl: './admin-opret-tag.component.html',
  styleUrls: ['./admin-opret-tag.component.css']
})
export class AdminOpretTagComponent implements OnInit {
  @Input() tagCreation = { name: ''};
  createForm : FormGroup;
  endpointT = '/Tags';
  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }
  
  onCancel() {
    return this.router.navigate(['../main/catalog']);
  };

  onSubmitBeer() {
    this.restApi.createData(this.tagCreation, this.endpointT).subscribe((data) => {
      this.router.navigate(['../main/catalog']);
    });
  }
}
