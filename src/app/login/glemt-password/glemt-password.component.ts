import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-glemt-password',
  templateUrl: './glemt-password.component.html',
  styleUrls: ['./glemt-password.component.css']
})
export class GlemtPasswordComponent implements OnInit {
  glemtPWForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.glemtPWForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      });
    }
}