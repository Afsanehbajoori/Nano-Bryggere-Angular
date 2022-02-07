import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-oprette-ol',
  templateUrl: './oprette-ol.component.html',
  styleUrls: ['./oprette-ol.component.css']
})
export class OpretteOlComponent implements OnInit {
  OpretForm : FormGroup;
  constructor(
    public restApi: RestApiService, 
    private router: Router   
  ) { }

  ngOnInit(): void {
    this.OpretForm = new FormGroup({
      navn: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    }
    );
  }

  onSubmitOl() {
    this.router.navigate(['../main/sletol']);
  };
}
