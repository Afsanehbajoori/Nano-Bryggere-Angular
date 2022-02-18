import { Rolle } from 'src/app/Models/Rolle';
import { Component, OnInit, Input , Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Kontaktolysninger } from 'src/app/Models/Kontaktoplysninger';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
@Component({
  providers:  [Rolle , Kontaktolysninger],
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {

@Input() newUser = { pw:'', brugernavn:'', rolleNavn:''  ,rolleId:null, level:'',kontaktoplysningerId: null ,
 fnavn: '', enavn: '', addresselinje1: '', addresselinje2: '', postnr: '',
  by: '', email:'', telefonnr: '' };


  BrugerFormGroup:any = new FormGroup({}) ;
  endpointK = '/Kontaktoplysninger';
  endpointB= '/Brugere';
  endpointR= '/Roller';
  constructor(private _formBuilder: FormBuilder , public restApi: RestApiService ,public router: Router) { }

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
   this.restApi.createData(this.newUser , this.endpointK).subscribe((dataK) => {
     console.log(dataK.id);
      this.newUser.kontaktoplysningerId= dataK.id;
      if(this.newUser.rolleNavn == 'AnonymBruger')
      this.newUser.level=0 + "";
      if(this.newUser.rolleNavn == 'Bruger')
      this.newUser.level=100 + "";
      if(this.newUser.rolleNavn == 'Moderator')
      this.newUser.level=200 + "";
      if(this.newUser.rolleNavn == 'Administrator')
      this.newUser.level=300 + "";
     this.restApi.createData(this.newUser , this.endpointR).subscribe((dataR) => {
      console.log(dataR.id);
      this.newUser.rolleId=dataR.id;
      this.restApi.createData(this.newUser , this.endpointB).subscribe((dataB) => {
        console.log(dataB);
        var brugerId = dataB.id;
        console.log("brugerId : " ,brugerId);
        this.router.navigate(["../login/login"]);
       }) ;

     })

    } , err => {
       {alert('udfyldt alle felter')

      }
    })
  }

}
