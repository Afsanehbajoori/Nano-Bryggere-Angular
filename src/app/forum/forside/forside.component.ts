import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SletDialogBoxComponent } from 'src/app/main/slet-dialog-box/slet-dialog-box.component';
import { Forum } from 'src/app/Models/Forum';
import { Post } from 'src/app/Models/Post';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.css']
})
export class ForsideComponent implements OnInit {
  @Input() postOprettelse = { title: '', indhold: ''};
  OpretForm : FormGroup;
  forums: Forum[];
  forum = new Forum;
  posts: Post[];
  endpointf = '/Forumer';
  endpointp = '/Posts';
  searchkey: string;
  showforum = false;
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.OpretForm = new FormGroup({
      title: new FormControl('', Validators.required),
      indhold: new FormControl('', Validators.required),
    });
    this.loadForum()
    // this.loadPost()
  }
  loadForum(){
    return this.restApi.getDatas(this.endpointf).subscribe((forum) => {
      this.forums = forum;
    })
  }
  loadPost(){
    return this.restApi.getDatas(this.endpointp).subscribe((post) => {
      this.posts = post;
    })
  }
  onFindForum(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.forums = this.forums.filter(res =>{
        return res.titel.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onAnnullerPost(){

  }
  
  onGodkendPost(){
    this.restApi.createData(this.postOprettelse, this.endpointp).subscribe((data) => {
      this.router.navigate(['../main/katalog']);
    });
  }

  onOpdaterPost(id: any){
    this.router.navigate(['../forum/redigerpost/' + id]);
  }

  onOpretForum() {
    this.router.navigate(['../forum/oprette']);
  };

  onOpdaterForum(id: any){
    this.router.navigate(['../forum/redigerslet/' + id]);
  }

  onSletForum(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpointf).subscribe(data => {
        this.loadForum();
      })
    });
  };

  onSletPost(id: any) {
    let dialogRef = this.dialog.open(SletDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.restApi.deleteData(id, this.endpointf).subscribe(data => {
        this.loadForum();
      })
    });
  };
}