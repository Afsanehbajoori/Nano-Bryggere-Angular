import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-samarbejde-rediger',
  templateUrl: './samarbejde-rediger.component.html',
  styleUrls: ['./samarbejde-rediger.component.css']
})
export class SamarbejdeRedigerComponent implements OnInit {
  selected = '';
  samarbejdeId :number;
  opdaterForm: FormGroup = new FormGroup({});
  endpointS = '/Samarbejder';
   samarbejdeListe:any;
  constructor(
    public dialogRefRedigerSamarbejde : MatDialogRef<SamarbejdeRedigerComponent>,
    public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.samarbejdeId=JSON.parse(localStorage.getItem('samarbejdeId') || '{}');
    this.restApi.getData(this.samarbejdeId , this.endpointS)
    .toPromise()
    .then(data => {
      this.samarbejdeListe=data;
      this.opdaterForm = this.formBuilder.group({
        bryggeriId1: new FormControl(this.samarbejdeListe.bryggeriId1),
        bryggeriId2: new FormControl(this.samarbejdeListe.bryggeriId2),
        titel: new FormControl(this.samarbejdeListe.titel),
        olBilled: new FormControl(this.samarbejdeListe.olBilled)
      });
    })

  }

  onSubmitCertifikat(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.samarbejdeListe.olBilled =e.target.result;
        localStorage.setItem('olBilled' ,JSON.stringify(this.samarbejdeListe.olBilled));
      }
    }
  };
}
