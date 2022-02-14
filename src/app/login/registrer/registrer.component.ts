import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {
  @Input() newUser = {fnavn: '', enavn: '', addresselinje1: null, addresselinje2: null, postnr: '',
   by: '', email:'', telefonnr: '', pw:'', brugernavn:'' , rolleNavn:'' , rolleId:null, kontaktoplysningerId:null , level:'' };
  RegistrerFormGroup:any = new FormGroup({}) ;
  endpointK = '/Kontaktoplysninger';
  endpointB= '/Brugere';




  constructor(private _formBuilder: FormBuilder ,
    public restApi: RestApiService ) { }

  ngOnInit(): void {

    this.RegistrerFormGroup = this._formBuilder.group({
      'fnavn' : new FormControl('' , Validators.required),
      'enavn': new FormControl('' , Validators.required),
      'addresselinje1': new FormControl(''),
      'addresselinje2': new FormControl(''),
      'postnr' : new FormControl(''),
      'by': new FormControl(''),
      'email' : new FormControl('' , Validators.email ),
      'telefonnr': new FormControl(''),
      'pw': new FormControl('' , Validators.required),
      'brugernavn':new FormControl(''),
      'rolleNavn' : new FormControl(''),
      'kontaktoplysningerId':new FormControl(''),
      'rolleId':new FormControl(''),
      'level':new FormControl('')
    });

  }

  createUser(){
   this.restApi.createData(this.newUser , this.endpointB ).subscribe((data) => {

     console.log(data);

    })
  }

}
