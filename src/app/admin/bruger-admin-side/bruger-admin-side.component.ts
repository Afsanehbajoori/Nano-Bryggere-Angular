import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Bryggeri } from 'src/app/Models/Bryggeri';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-bruger-admin-side',
  templateUrl: './bruger-admin-side.component.html',
  styleUrls: ['./bruger-admin-side.component.css']
})
export class BrugerAdminSideComponent implements OnInit {
  users: Bryggeri[];
  user = new Bryggeri;
  endpoints = '/Brugere';
  searchkey: string;

  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.loadBruger();
  }
  loadBruger(){
    return this.restApi.getDatas(this.endpoints).subscribe((user) => {
      this.users = user;
    })
  }
  onVisBruger(id:any) {
    this.router.navigate(['../admin/brugerredigerol/',id]);
  };

  onFindBrugere(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.users = this.users.filter(res =>{
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
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
}
