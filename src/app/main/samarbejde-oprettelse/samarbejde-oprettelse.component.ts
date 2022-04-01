import { Component, OnInit ,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-samarbejde-oprettelse',
  templateUrl: './samarbejde-oprettelse.component.html',
  styleUrls: ['./samarbejde-oprettelse.component.css']
})
export class SamarbejdeOprettelseComponent implements OnInit {
  @Input() nySamarbejde = { olBilled: '', titel: '', bryggeriId2:0, bryggeriId1:0}
  opretForm : any = new FormGroup({});
  olBilled:any;
  bryggeriId:number;
  endpointS='/Samarbejder';
  endpointB = '/Bryggerier';
  endpointO='/Øller';
  bryggriList:any;
  bryggrisNavn= new Array();
  samarbejdeId:number;
  constructor(
    public dialogRefOpretSamarbejde:MatDialogRef<SamarbejdeOprettelseComponent>,
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.bryggeriId=JSON.parse(localStorage.getItem('bryggeriId') || '{}');
    console.log('bryggeriId:' , this.bryggeriId)
    this.onHentBryggeri();

    this.opretForm = this._formBuilder.group({
      'olBilled': new FormControl(''),
      'titel': new FormControl('', Validators.required),
      'bryggeriId2': new FormControl(''),
      'bryggeriId1': new FormControl(''),
      //'olId': new FormControl('')
    })

  }

  onHentBryggeri(){
    this.restApi.getDatas(this.endpointB).subscribe(data => {
      this.bryggriList=data;
      for(let i=0; i<data.length;i++ ){
        const dropdownInfo= {bryggeinavn: this.bryggriList[i].navn , bryggeriId2 : this.bryggriList[i].id}
        this.bryggrisNavn.push(dropdownInfo)
      }
      console.log('BryggeriList' , this.bryggrisNavn)
    })
  }
onAnuller(){
  this.opretForm.reset();
  this.router.navigate(['/main/samarbejds-side'])

}
onSubmitProfilBilled(event: any) {
  if(event.target.files) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) => {
      this.olBilled = e.target.result;
      localStorage.setItem('olBilled', JSON.stringify(this.olBilled));
    }
  }
};
onSubmitSamarbejde(){
  this.nySamarbejde.olBilled = JSON.parse(localStorage.getItem('olBilled') || '{}');
  this.nySamarbejde.bryggeriId1=JSON.parse(localStorage.getItem('bryggeriId') || '{}');
  //this.nySamarbejde.olId=JSON.parse(localStorage.getItem('olId') || '{}');
  this.restApi.createData(this.nySamarbejde , this.endpointS).subscribe(data => {
    localStorage.setItem('samarbejdeId' ,JSON.stringify(data.id) )
    console.log('samarbejdeId:',data);
    this.dialogRefOpretSamarbejde.close();
    this.ngOnInit();
  })
  }
}
