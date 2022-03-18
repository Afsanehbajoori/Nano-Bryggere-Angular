import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-certifikat-dialog-box',
  templateUrl: './certifikat-dialog-box.component.html',
  styleUrls: ['./certifikat-dialog-box.component.css']
})
export class CertifikatDialogBoxComponent implements OnInit {

  constructor( public dialogRefGodkend : MatDialogRef<CertifikatDialogBoxComponent>) { }

  ngOnInit(): void {
  }

}
