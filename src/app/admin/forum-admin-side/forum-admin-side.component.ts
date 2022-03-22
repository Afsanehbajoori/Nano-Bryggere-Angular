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
  forumList:any;
  endpointf = '/Forumer';
  endpointp = '/Posts';
  forums:any;
  clickButton:boolean=true;
  posts:any;
  updateForm: FormGroup = new FormGroup({});
  updateForum:any;

  constructor( public dialog: MatDialog,
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.onLoadForum();
    this.onLoadPost();
  }
  onLoadForum(){
    return this.restApi.getDatas(this.endpointf).subscribe((forum) => {
      this.forums = forum;
      console.log('forum:', this.forums)
    })
  }
    onLoadPost(){
    return this.restApi.getDatas(this.endpointp).subscribe((post) => {
      this.posts = post;
      console.log('posts:',this.posts);
    })
  }
  onCreateForum(){
    this.router.navigate(['../forum/oprette']);
  }

  onShowForum(id:any){
    this.router.navigate(['../forum/forum']);
   }

  onFindForumtitle(){

  }

  onUpdateForum(id:any){
    this.clickButton=false;
    this.restApi.getData(id , this.endpointf)
    .toPromise()
    .then(data => {
      this.updateForum= data ;
      this.updateForm = this.formBuilder.group({
        title : new FormControl(this.updateForum.title),
        description : new FormControl(this.updateForum.description),
        createDate : new FormControl(this.updateForum.createDate)
      })
    })
  }

  SaveChanges(id:any){
    this.restApi.updateData(id, this.endpointf,this.updateForum).subscribe(data => {
      this.ngOnInit()
    })
  }

  onCancel(){
    this.ngOnInit()
  }

  onDeleteForum(id:any){
      this.posts=this.posts.filter((p:any) => p.forumId === id)
      console.log('data:', this.posts)
      if(this.posts.length === 0){
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpointf).subscribe(data => {
        this.ngOnInit();
      })
    });
    }else{
      alert('All of messages in post page have to delete first!');
      this.router.navigate(['../forum/forum']);
    }
  }
}