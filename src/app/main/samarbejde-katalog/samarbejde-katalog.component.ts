import { Component, OnInit ,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-samarbejde-katalog',
  templateUrl: './samarbejde-katalog.component.html',
  styleUrls: ['./samarbejde-katalog.component.css']
})
export class SamarbejdeKatalogComponent implements OnInit {
  @Input() olOprettelse = { navn: '', type: '', smag: '', procent: null, land: '', olBilled: '', beskrivelse:'', antal: '', argang: '', samarbejdeId:null };
  opretForm : any = new FormGroup({});
  endpointO = '/Øller';
  olBilled:any;
  samarbejdeId:number;

  constructor( public restApi: RestApiService,
    private router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.opretForm = new FormGroup({
      navn: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      smag: new FormControl('', Validators.required),
      procent: new FormControl('', Validators.required),
      samarbejdeId: new FormControl('', Validators.required),
      argang: new FormControl('', Validators.required),
      land: new FormControl('', Validators.required),
      process: new FormControl('', Validators.required),
      olBilled: new FormControl('' , Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      antal: new FormControl('', Validators.required)
    });
  }
  onAnuller(){

  }
  onSubmitOlBilled(event: any) {
    if(event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.olBilled = e.target.result;
        localStorage.setItem('olBilled', JSON.stringify(this.olBilled));
      }
    }
  };
  onSubmitOl() {
    this.olOprettelse.samarbejdeId = JSON.parse(localStorage.getItem('samarbejdeId') || '{}');
    this.olOprettelse.olBilled = JSON.parse(localStorage.getItem('olBilled') || '{}');
     console.log('samarbejdeId:',this.olOprettelse.samarbejdeId);
     console.log('oloprettelse', this.olOprettelse);
    this.restApi.createData(this.olOprettelse, this.endpointO).subscribe((data) => {
      localStorage.setItem('olId', JSON.stringify(data.id));
      console.log('info:', data)
      //this.router.navigate(['../main/katalog']);
    });
  }
}
