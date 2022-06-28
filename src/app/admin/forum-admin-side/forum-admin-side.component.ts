import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Forum } from 'src/app/Models/Forum';
import { Rolle } from 'src/app/Models/Rolle';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { OpdaterForumDialogBoxComponent } from '../opdater-forum-dialog-box/opdater-forum-dialog-box.component';
import { OpretForumDialogBoxComponent } from '../opret-forum-dialog-box/opret-forum-dialog-box.component';

@Component({
  selector: 'app-forum-admin-side',
  templateUrl: './forum-admin-side.component.html',
  styleUrls: ['./forum-admin-side.component.css']
})
export class ForumAdminSideComponent implements OnInit {
  dialogRefSlet: MatDialogRef<SletDialogBoxComponent>;
  dialogRefOpretForum: MatDialogRef<OpretForumDialogBoxComponent>;
  dialogRefOpdaterForum: MatDialogRef<OpdaterForumDialogBoxComponent>;
  forums: Forum[];
  forumListe: any;
  endpointF = '/Forumer';
  endpointP = '/Posts';
  endpointR = '/Rolle';
  clickButton:boolean=true;
  posts:any;
  postListe: any;
  searchkey: string;
  opdaterForm: FormGroup = new FormGroup({});
  opdaterForum:any;
  rolleListe: Rolle [];
  rolle: any;

  constructor( public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.onHentForum();
    this.onHentPost();
    this.onHentRolle();
  }
  onHentForum(){
    return this.restApi.getDatas(this.endpointF).subscribe((forum) => {
      this.forums = forum;
    })
  }
    onHentPost(){
    return this.restApi.getDatas(this.endpointP).subscribe((post) => {
      this.posts = post;
    })
  }
  onHentRolle(){
    this.restApi.getDatas(this.endpointR).subscribe(roller =>{ 
      this.rolleListe = roller
      this.rolle = this.rolleListe.find((a:any) => a.level === 300)
      console.log("rolle:", this.rolle.level);
    })
  }
  onOpretForum(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = 'auto';
    this.dialogRefOpretForum = this.dialog.open(OpretForumDialogBoxComponent, dialogConfig);
    this.dialogRefOpretForum.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  onVisPost(id:any){
    this.clickButton=false;
        this.postListe = this.posts.filter((res: any) => res.forumId === id);
  }

  onFindForumtitel(){
    if (this.searchkey == "") {
      this.ngOnInit();
    }
    else {
      this.restApi.getUserByEventsTitle(this.searchkey, this.endpointF).subscribe(data => {
        this.forums = data;
      })
    }
  }

  onOpdaterForum(id:any){
    localStorage.setItem('forumsId', JSON.stringify(id));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = 'auto';
    this.dialogRefOpdaterForum = this.dialog.open(OpdaterForumDialogBoxComponent, dialogConfig);
    this.dialogRefOpdaterForum.afterClosed().subscribe(result => {
      if (result) {
        this.forumListe = result;
        console.log(this.forumListe);
        this.restApi.updateData(id, this.endpointF, this.forumListe).subscribe((data) => {
          this.ngOnInit();
        })
      }
    })
  }

  onGemAndringer(id:any){
    this.restApi.updateData(id, this.endpointF, this.opdaterForum).subscribe(data => {
      this.ngOnInit()
    })
  }

  onAnuller(){
    this.ngOnInit()
  }

  onSletForum(id:any){
      this.posts=this.posts.filter((p:any) => p.forumId === id)
    if(this.posts.length === 0){
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.restApi.deleteData(id, this.endpointF).subscribe(data => {
          this.ngOnInit();
        })
      }
    });
    }
    else{
      alert('alle beskeder i forumet skal slettes først!');
    }
  }
  
  onSletPost(id: any) {
    this.restApi.getData(id, this.endpointP).subscribe(data => {
      console.log("brugerId:" , data);
      console.log("rolleId:" , this.rolle);
      if(this.rolle.level ===300) {
        let dialogRef = this.dialog.open(SletDialogBoxComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result == true) {
            this.restApi.deleteData(id, this.endpointP).subscribe(data => {
              this.ngOnInit();
            })
          }
        });
      } else {
        alert('du kan ikke slette denne besked, du er kun en bruger!')
      }
    })
  }
}