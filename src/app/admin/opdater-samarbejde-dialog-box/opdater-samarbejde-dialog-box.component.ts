import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { UpdateEventsDialogBoxComponent } from '../update-events-dialog-box/update-events-dialog-box.component';

@Component({
  selector: 'app-opdater-samarbejde-dialog-box',
  templateUrl: './opdater-samarbejde-dialog-box.component.html',
  styleUrls: ['./opdater-samarbejde-dialog-box.component.css']
})
export class OpdaterSamarbejdeDialogBoxComponent implements OnInit {
  opdaterForm: FormGroup = new FormGroup({});
  samarbejdeListe:any;
  endpointS= '/Samarbejder';
  endpontsB= '/Bryggerier'
  samarbejdeId : number;
  bryggeriList:any;
  bryggeriNavn= new Array();
  constructor( 
    public dialogRefOpdaterSamarbejde : MatDialogRef<OpdaterSamarbejdeDialogBoxComponent>,
    private formBuilder: FormBuilder,
    public restApi: RestApiService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.samarbejdeId=JSON.parse(localStorage.getItem('samarbejdeId') || '{}');
    this.restApi.getDatas(this.endpontsB).subscribe(data => {
      this.bryggeriList=data;
      for(let i=0; i<data.length;i++ ){
        const dropdownInfo= {bryggeinavn: this.bryggeriList[i].navn , bryggeriId2 : this.bryggeriList[i].id}
        this.bryggeriNavn.push(dropdownInfo)
      }
    })
    this.restApi.getData(this.samarbejdeId , this.endpointS)
    .toPromise()
    .then(data => {
      this.samarbejdeListe= data ;

      this.opdaterForm = this.formBuilder.group({
        bryggeriId1 : new FormControl(this.samarbejdeListe.bryggeriId1),
        bryggeriId2 : new FormControl(this.samarbejdeListe.bryggeriId2),
        titel: new FormControl(this.samarbejdeListe.titel),
        olBilled: new FormControl(this.samarbejdeListe.olBilled),
      })
    })
  }

  onSubmitSamarbejde(samarbejde: any) {
    if(samarbejde.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(samarbejde.target.files[0]);
      reader.onload=(s: any)=>{
        this.samarbejdeListe.olBilled =s.target.result;
        localStorage.setItem('samarbejdeBilled' ,JSON.stringify(this.samarbejdeListe.olBilled));
      }
    }
  };

}
