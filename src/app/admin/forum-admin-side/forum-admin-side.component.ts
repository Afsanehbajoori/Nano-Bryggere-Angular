import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-forum-admin-side',
  templateUrl: './forum-admin-side.component.html',
  styleUrls: ['./forum-admin-side.component.css']
})
export class ForumAdminSideComponent implements OnInit {
  forumListe:any;
  endpointF = '/Forumer';
  endpointP = '/Posts';
  forums:any;
  clickButton:boolean=true;
  posts:any;
  opdaterForm: FormGroup = new FormGroup({});
  opdaterForum:any;

  constructor( public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.onHentForum();
    this.onHentPost();
  }
  onHentForum(){
    return this.restApi.getDatas(this.endpointF).subscribe((forum) => {
      this.forums = forum;
      console.log('forum:', this.forums)
    })
  }
    onHentPost(){
    return this.restApi.getDatas(this.endpointP).subscribe((post) => {
      this.posts = post;
      console.log('posts:',this.posts);
    })
  }
  onOpretForum(){
    this.router.navigate(['../forum/opret-forum']);
  }

  onVisForum(id:any){
    this.router.navigate(['../forum/forum']);
   }

  onFindForumtitel(){

  }

  onOpdaterForum(id:any){
    this.clickButton=false;
    this.restApi.getData(id , this.endpointF)
    .toPromise()
    .then(data => {
      this.opdaterForum= data ;
      this.opdaterForm = this.formBuilder.group({
        titel : new FormControl(this.opdaterForum.titel),
        beskrivelse : new FormControl(this.opdaterForum.beskrivelse),
        oprettet : new FormControl(this.opdaterForum.oprettet)
      })
    })
  }

  onGemAndringer(id:any){
    this.restApi.updateData(id, this.endpointF,this.opdaterForum).subscribe(data => {
      this.ngOnInit()
    })
  }

  onAnuller(){
    this.ngOnInit()
  }

  onSletForum(id:any){
      this.posts=this.posts.filter((p:any) => p.forumId === id)
      console.log('data:', this.posts)
      if(this.posts.length === 0){
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.restApi.deleteData(id, this.endpointF).subscribe(data => {
          this.ngOnInit();
        })
      }
    });
    }else{
      alert('All of messages in post page have to delete first!');
      this.router.navigate(['../forum/forum']);
    }
  }
}