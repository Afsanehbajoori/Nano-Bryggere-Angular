import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-glemt-password',
  templateUrl: './glemt-password.component.html',
  styleUrls: ['./glemt-password.component.css']
})
export class GlemtPasswordComponent implements OnInit {
  glemtPWForm:FormGroup;
  endpointK = '/KontaktOplysninger';
  endpointB = '/Bruger';
  //kontaktListe:KontaktOplysninger;
  //brugerListe:Bruger;
  @Input() intastEmail={email:""};

  constructor( public router: Router,
    public restApi: RestApiService
    ) { }

  ngOnInit(): void {
 /*    this.onHentKontaktoplysninger();
    this.onHentBruger(); */
    this.glemtPWForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      });
      console.log('glemtPWForm:' , this.glemtPWForm);
    }

/*     onHentKontaktoplysninger() {
      return this.restApi.getDatas(this.endpointK).subscribe((kontaktData) => {
        this.kontaktListe = kontaktData;
        console.log('kontakt:' , this.kontaktListe);
      })
    };

    onHentBruger() {
      return this.restApi.getDatas(this.endpointB).subscribe((brugerData) => {
        this.brugerListe = brugerData;
        console.log('brugerListe:' , this.brugerListe);
      })
    }; */

    onSendEmail(){
      this.restApi.getDatas(this.endpointK).subscribe((emailData) => {
        const existEmail = emailData.find((e:any) => {
          return e.email.toLowerCase() === this.intastEmail.email.toLowerCase()
        });
       
        if(existEmail){
          console.log('test:' , existEmail);
          alert('Vær venlig og check din email');
        }
      })
    }
}