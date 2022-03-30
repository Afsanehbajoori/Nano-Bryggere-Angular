import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  redigerPWForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.redigerPWForm = new FormGroup({
      PWCtrl: new FormControl('', [Validators.required]),
      });
  }
}