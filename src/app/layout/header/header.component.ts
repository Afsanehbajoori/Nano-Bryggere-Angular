import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  erAdmin: boolean;
  rolleId: number;
  // godkendelse: boolean;
  // endpointB = '/Posts';
  endpointR = '/Rolle';
  constructor(
    public restApi: RestApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.onTjekRolle();
    if(this.rolleId = JSON.parse(localStorage.getItem('rolleId') || '{}')){
      this.restApi.getData(this.rolleId, this.endpointR).subscribe((data) =>{
        if(data.level == 300){
          this.erAdmin = true;
          console.log(this.erAdmin);
        }
        else{
          this.erAdmin = false;
          console.log(this.erAdmin);
        }
      })
    }
  }
  onClickMenu(){
    return this.router.navigate(['../main/main']);
  }
  // onTjekRolle(){

  // }
}
