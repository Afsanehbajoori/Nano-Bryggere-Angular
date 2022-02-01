import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  EditPWForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.EditPWForm = new FormGroup({
      PWCtrl: new FormControl('', [Validators.required]),
      });
  }

}
