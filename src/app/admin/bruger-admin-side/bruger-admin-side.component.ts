import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bruger } from 'src/app/Models/Bruger';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { Kontaktoplysninger } from 'src/app/Models/Kontaktoplysninger';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-bruger-admin-side',
  templateUrl: './bruger-admin-side.component.html',
  styleUrls: ['./bruger-admin-side.component.css']
})
export class BrugerAdminSideComponent implements OnInit {
  users: Bruger[];
  user = new Bryggeri;
  endpoints='/Brugere'
  endpointk = '/Kontaktoplysninger';
  searchkey: string;
  kontaktoplysninger:any;
  BrugerId = this.actRoute.snapshot.params['id'];
  kontaktoplysningerId:number;
  clickButton:boolean=true;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadBruger();
    this.clickButton=false;
  }
  loadBruger(){
    return this.restApi.getDatas(this.endpoints).subscribe((user) => {
      this.users = user;
      console.log(this.users);

    })

  }
  onVisBruger(id:any){
   this.clickButton=false;
      this.BrugerId=id;
      console.log("id:",this.BrugerId);
      return this.restApi.getData(this.BrugerId , this.endpoints).subscribe((data) => {
        console.log("kontId:",data.kontaktoplysningerId);
        this.kontaktoplysningerId=data.kontaktoplysningerId;
        this.restApi.getData(this.kontaktoplysningerId ,this.endpointk ).subscribe((data) => {
          this.kontaktoplysninger = data;
          console.log( this.kontaktoplysninger);
        })
      })

  }


  onFindBrugere(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.users = this.users.filter(res =>{
        return res.brugernavn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onSletBruger(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpoints).subscribe(data => {
        this.loadBruger();
      })
    });
  };

   onUpdateBruger(id:any) {
    //this.router.navigate(['../main/',id]);

  };

  onOpretteBruger(id:any) {
    //this.router.navigate(['../admin/brugerredigerol/',id]);
  };
}
