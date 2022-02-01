import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {
  FormGroupFNavn:FormGroup;
  FormGroupENavn:FormGroup;
  FormGroupAdd1:FormGroup;
  FormGroupAdd2:FormGroup;
  FormGroupPost:FormGroup;
  FormGroupBy:FormGroup;
  FormGroupEmail:FormGroup;
  FormGroupTel:FormGroup;
  FormGroupPW:FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.FormGroupFNavn = this._formBuilder.group({
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


  }

}
