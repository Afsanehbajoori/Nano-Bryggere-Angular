import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-slet-dialog-box',
  templateUrl: './slet-dialog-box.component.html',
  styleUrls: ['./slet-dialog-box.component.css']
})
export class SletDialogBoxComponent implements OnInit {

  constructor( public dialogRef : MatDialogRef<SletDialogBoxComponent> ) { }

  ngOnInit(): void {
  }

}




