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
  erBrygger: boolean;
  rolleId: number;
  bryggeriId: number;
  endpointR = '/Rolle';
  endpointB = '/Bryggerier';
  constructor(
    public restApi: RestApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.onHentRolle();
    this.onHentBryggeri();
  }

  onHentBryggeri(){
    if(this.bryggeriId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')){
      this.restApi.getData(this.bryggeriId, this.endpointB).subscribe((data) =>{
        if(data.id == this.bryggeriId){
          console.log("bryggeriId", this.bryggeriId);
          console.log("data.id", data.id);
          console.log("J");
          this.erBrygger = true;
          console.log(this.erBrygger);
        }
        else{
          console.log("N");
          this.erBrygger = false;
          console.log(this.erBrygger);
        }
      })
    }
    else{
      console.log("Ingen Bryggeri id");
      this.erBrygger = false;
    }
  }

  onHentRolle(){
    if(this.rolleId = JSON.parse(localStorage.getItem('rolleId') || '{}')){
      this.restApi.getData(this.rolleId, this.endpointR).subscribe((data) =>{
        if(data.level == 300){
          this.erAdmin = true;
        }
        else{
          this.erAdmin = false;
        }
      })
    }
  }

  onClickMenu(){
    return this.router.navigate(['../main/main']);
  }
}