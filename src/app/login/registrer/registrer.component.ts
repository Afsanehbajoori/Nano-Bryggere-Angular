import { Rolle } from 'src/app/Models/Rolle';
import { Component, OnInit, Input , Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Kontaktolysninger } from 'src/app/Models/Kontaktoplysninger';

@Injectable()
@Component({
  providers:  [Rolle , Kontaktolysninger],
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {
  @Input() Rolle: any ;
  @Input() Kontaktolysninger: any ;


  @Input() newUser = { pw:'', brugernavn:'',rolleId:'', rolleNavn:'' , level:'',
  kontaktoplysningerId: '' ,fnavn: '', enavn: '', addresselinje1: '', addresselinje2: '', postnr: '',
  by: '', email:'', telefonnr: '' };


  BrugerFormGroup:any = new FormGroup({}) ;
  endpointK = '/Kontaktoplysninger';
  endpointB= '/Brugere';
  endpointR= '/Roller';



  constructor(private _formBuilder: FormBuilder ,
    public restApi: RestApiService
     ) { }

  ngOnInit(): void {

    this.BrugerFormGroup = this._formBuilder.group({
      'kontaktoplysningerId':new FormControl(''),
      'fnavn' : new FormControl('' , Validators.required),
      'enavn': new FormControl('' , Validators.required),
      'addresselinje1': new FormControl(''),
      'addresselinje2': new FormControl(''),
      'postnr' : new FormControl(''),
      'by': new FormControl(''),
      'email' : new FormControl('' , Validators.email ),
      'telefonnr': new FormControl(''),
      'brugernavn' : new FormControl(''),
      'pw':new FormControl(''),
      'rolleId':new FormControl(''),
      'rolleNavn':new FormControl(''),
      'level':new FormControl('')
    });



  }



  createUser(){
   this.restApi.createData(this.newUser , this.endpointB).subscribe((data) => {
     console.log(data);
     this.restApi.createData(this.newUser , this.endpointK).subscribe((data) => {
      console.log(data);
       this.restApi.createData(this.newUser , this.endpointR).subscribe((data) => {
        console.log(data);

       })
     })

    })
  }

}
