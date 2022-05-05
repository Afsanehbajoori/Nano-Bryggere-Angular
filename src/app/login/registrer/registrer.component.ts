import { Rolle } from 'src/app/Models/Rolle';
import { Component, OnInit, Input , Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { KontaktOplysninger } from 'src/app/Models/KontaktOplysninger';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
@Component({
  providers:  [Rolle , KontaktOplysninger],
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})

export class RegistrerComponent implements OnInit {

@Input() nyBruger = { pw: '', brugernavn: '', rolleNavn: '', rolleId: null, level: '', kontaktOplysningerId: null,
 fnavn: '', enavn: '', adresseLinje1: '', adresseLinje2: '', postNr: '',
  by: '', email: '', telefonNr: '', certifikatStatus: 1};

  brugerFormGroup:any = new FormGroup({});
  endpointK = '/KontaktOplysninger';
  endpointB= '/Bruger';
  endpointR= '/Rolle';

  constructor(private _formBuilder: FormBuilder, public restApi: RestApiService, public router: Router) { }

  ngOnInit(): void {
    this.brugerFormGroup = this._formBuilder.group({
      'kontaktOplysningerId': new FormControl(''),
      'fnavn' : new FormControl('' , Validators.required),
      'enavn': new FormControl('' , Validators.required),
      'adresseLinje1': new FormControl(''),
      'adresseLinje2': new FormControl(''),
      'postNr' : new FormControl(''),
      'by': new FormControl(''),
      'email' : new FormControl('' , Validators.email ),
      'telefonNr': new FormControl(''),
      'brugernavn' : new FormControl(''),
      'pw': new FormControl(''),
      'rolleId': new FormControl(''),
      'rolleNavn': new FormControl(''),
      'level': new FormControl(''),
    });
  }

  onOpretBruger(){
   this.nyBruger.certifikatStatus = 1;
   this.restApi.createData(this.nyBruger, this.endpointK).subscribe((dataC) => {
      this.nyBruger.kontaktOplysningerId= dataC.id;
      if(this.nyBruger.rolleNavn == 'AnonymBruger')
      this.nyBruger.level=0 + "";
      if(this.nyBruger.rolleNavn == 'Bruger')
      this.nyBruger.level=100 + "";
      if(this.nyBruger.rolleNavn == 'Moderator')
      this.nyBruger.level=200 + "";
      if(this.nyBruger.rolleNavn == 'Administrator')
      this.nyBruger.level=300 + "";
     this.restApi.createData(this.nyBruger , this.endpointR).subscribe((dataR) => {
      this.nyBruger.rolleId=dataR.id;
      this.restApi.createData(this.nyBruger , this.endpointB).subscribe((dataB) => {
        var userId = dataB.id;
        this.router.navigate(["../login/login"]);
       }) ;
     })
    } , err => {
       {alert('udfyldt alle felter')
      }
    })
  }
}