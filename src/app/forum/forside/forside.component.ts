import { Component, OnInit } from '@angular/core';
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
  forums: Forum[];
  forum = new Forum;
  posts: Post[];
  endpointf = '/Forumer';
  endpointp = '/Posts';
  constructor(
    public dialog: MatDialog,
    public restApi: RestApiService, 
    public router: Router,
    public actRoute: ActivatedRoute 
  ) { }

  ngOnInit(): void {
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
}