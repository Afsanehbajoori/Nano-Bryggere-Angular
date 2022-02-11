import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {
  RegistrerFormGroup:any = new FormGroup({}) ;
  endpointK = '/Kontaktoplysninger';
  newUser : any;

 /*  FormGroupENavn:FormGroup;
  FormGroupAdd1:FormGroup;
  FormGroupAdd2:FormGroup;
  FormGroupPost:FormGroup;
  FormGroupBy:FormGroup;
  FormGroupEmail:FormGroup;
  FormGroupTel:FormGroup;
  FormGroupPW:FormGroup; */

  constructor(private _formBuilder: FormBuilder ,
    public restApi: RestApiService ) { }

  ngOnInit(): void {

    this.RegistrerFormGroup = this._formBuilder.group({
      'FNavnCtrl' : new FormControl('' , Validators.required),
      'ENavnCtrl': new FormControl('' , Validators.required),
      'Add1Ctrl': new FormControl(''),
      'Add2Ctrl': new FormControl(''),
      'PostCtrl' : new FormControl(''),
      'ByCtrl': new FormControl(''),
      'EmailCtrl' : new FormControl('' , Validators.email ),
      'TelCtrl': new FormControl(''),
      // 'PWCtrl': new FormControl('' , Validators.required)
    });



    /* this.FormGroupFNavn = this._formBuilder.group({
      FNavnCtrl: ['', Validators.required],
    });

    this.FormGroupENavn = this._formBuilder.group({
      ENavnCtrl: ['', Validators.required],
    });

    this.FormGroupAdd1 = this._formBuilder.group({
      Add1Ctrl: ['', Validators.required],
    });
    this.FormGroupAdd2 = this._formBuilder.group({
      Add2Ctrl: ['', Validators.required],
    });
    this.FormGroupPost = this._formBuilder.group({
      PostCtrl: ['', Validators.required],
    });
    this.FormGroupBy = this._formBuilder.group({
      ByCtrl: ['', Validators.required],
    });
    this.FormGroupEmail = this._formBuilder.group({
      EmailCtrl: ['', Validators.required],
    });
    this.FormGroupTel = this._formBuilder.group({
      TelCtrl: ['', Validators.required],
    });
    this.FormGroupPW = this._formBuilder.group({
      PWCtrl: ['', Validators.required],
    });

 */
  }

  createUser(){

    console.log(this.RegistrerFormGroup.value);

   /*  this.newUser =this.RegistrerFormGroup.value;
    console.log(this.newUser); */

   this.restApi.createData(this.newUser , this.endpointK).subscribe((data) => {
    // this.newUser=data;
     console.log(data);
    })
  }

}
