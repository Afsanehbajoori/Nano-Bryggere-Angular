import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Kontaktolysninger } from 'src/app/Models/Kontaktoplysninger';


@Component({
  selector: 'app-slet-dialog-box',
  templateUrl: './slet-dialog-box.component.html',
  styleUrls: ['./slet-dialog-box.component.css']
})
export class SletDialogBoxComponent implements OnInit {

  constructor( public restApi: RestApiService ) { }


    onNoClick(): void {
      close();

    }

    onYesClick(): void{

    }

  ngOnInit(): void {
  }

}
