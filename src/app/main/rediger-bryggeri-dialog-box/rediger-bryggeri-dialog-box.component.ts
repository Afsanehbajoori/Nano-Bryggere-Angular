import { Component, OnInit } from '@angular/core';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-rediger-bryggeri-dialog-box',
  templateUrl: './rediger-bryggeri-dialog-box.component.html',
  styleUrls: ['./rediger-bryggeri-dialog-box.component.css']
})
export class RedigerBryggeriDialogBoxComponent implements OnInit {
  bryggeriList : Bryggeri[];
  bryggeri = new Bryggeri;
  endpointB='/Bryggerier';
  updateBryggeriForm:FormGroup;


  constructor(public restApi: RestApiService , private router: Router ,private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.loadBryggeri();
    this.updateBryggeriForm = new FormGroup({
      logoCtl:new FormControl(''),
      navnCtl:new FormControl(''),
      beskrivelseCtl:new FormControl('')

    });
  }

  loadBryggeri(){
    return this.restApi.getDatas(this.endpointB).subscribe((bryggeri) => {
        this.bryggeriList = bryggeri;
    })
  };
  onCancelClick() : void {
      close();
  }

  onSaveClick() {
    /* this.restApi.updateData(id , this.endpointB ,this.updateBryggeriForm.value)
    .subscribe(res => console.log(res),err=>{console.log(err)}); */
    console.log(this.updateBryggeriForm.value);
  }




}
