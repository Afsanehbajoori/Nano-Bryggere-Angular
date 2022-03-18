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
  @Input() forumCreation = { titel: '', beskrivelse: ''};
  createForm: any = new FormGroup({});
  endpointF = '/Forumer';

  constructor( public restApi: RestApiService, private router: Router, public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      titel: new FormControl('', Validators.required),
      beskrivelse: new FormControl('', Validators.required),
      // oprettelse: new FormControl('', Validators.required),
    });
  }

  onCancelForum() {
    return this.router.navigate(['../forum/forum'])
  };

  onSubmitForum() {
    //console.log('forum',this.forumOprettelse);
    this.restApi.createData(this.forumCreation, this.endpointF).subscribe((data) => {
      this.router.navigate(['../forum/forum'])
      localStorage.setItem('forumId' ,JSON.stringify(data.id));
      console.log('id',data.id);
    })
  }
}