import { Role } from 'src/app/Models/Role';
import { Component, OnInit, Input , Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { ContactInformation } from 'src/app/Models/ContactInformation';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
@Component({
  providers:  [Role , ContactInformation],
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})

export class RegistrerComponent implements OnInit {

@Input() newUser = { pw:'', username:'', roleName:'', roleId:null, level:'', contactInformationId: null,
 fname: '', sname: '', addressline1: '', addressline2: '', mailNr: '',
  city: '', email:'', phoneNr: '' };

  userFormGroup:any = new FormGroup({});
  endpointK = '/Kontaktoplysninger';
  endpointB= '/Brugere';
  endpointR= '/Roller';

  constructor(private _formBuilder: FormBuilder, public restApi: RestApiService, public router: Router) { }

  ngOnInit(): void {
    this.userFormGroup = this._formBuilder.group({
      'contactInformationId':new FormControl(''),
      'fname' : new FormControl('' , Validators.required),
      'sname': new FormControl('' , Validators.required),
      'addressline1': new FormControl(''),
      'addressline2': new FormControl(''),
      'mailNr' : new FormControl(''),
      'city': new FormControl(''),
      'email' : new FormControl('' , Validators.email ),
      'phoneNr': new FormControl(''),
      'username' : new FormControl(''),
      'pw':new FormControl(''),
      'roleId':new FormControl(''),
      'roleName':new FormControl(''),
      'level':new FormControl('')
    });
  }

  createUser(){
   this.restApi.createData(this.newUser, this.endpointK).subscribe((dataK) => {
     console.log(dataK.id);
      this.newUser.contactInformationId= dataK.id;
      if(this.newUser.roleName == 'AnonymBruger')
      this.newUser.level=0 + "";
      if(this.newUser.roleName == 'Bruger')
      this.newUser.level=100 + "";
      if(this.newUser.roleName == 'Moderator')
      this.newUser.level=200 + "";
      if(this.newUser.roleName == 'Administrator')
      this.newUser.level=300 + "";
     this.restApi.createData(this.newUser , this.endpointR).subscribe((dataR) => {
      console.log(dataR.id);
      this.newUser.roleId=dataR.id;
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