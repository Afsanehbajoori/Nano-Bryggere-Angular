import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-oprette',
  templateUrl: './oprette.component.html',
  styleUrls: ['./oprette.component.css']
})
export class OpretteComponent implements OnInit {

  @Input() forumOprettelse = { titel: '', beskrivelse: '' , oprettet:'', brugerId: 0};
  opretForm: any = new FormGroup({});
  endpointF = '/Forumer';
  brugerId: number;
  oprettet: Date;

  constructor( public restApi: RestApiService, private router: Router, public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.opretForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      oprettet: new FormControl('', Validators.required)
    });
    this.brugerId = JSON.parse(localStorage.getItem('brugerId') || '{}');
  }

  onAnuller() {
    return this.router.navigate(['../forum/forum'])
  };

  onSubmitForum() {
    this.forumOprettelse.brugerId = this.brugerId;
    // this.forumOprettelse.oprettet = this.oprettet.getDate.toString();
    this.restApi.createData(this.forumOprettelse, this.endpointF).subscribe((data) => {
      this.router.navigate(['../forum/forum'])
      localStorage.setItem('forumId' ,JSON.stringify(data.id));
    })
  }
}