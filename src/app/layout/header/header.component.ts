import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { RestApiService } from 'src/app/shared/rest-api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  // godkendelse: boolean;
  // endpointB = '/Posts';
  // endpointR = '/Rolle';
  constructor(
    // public restApi: RestApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.onTjekRolle();
  }
  onClickMenu(){
    return this.router.navigate(['../main/main']);
  }
  // onTjekRolle(){

  // }
}
