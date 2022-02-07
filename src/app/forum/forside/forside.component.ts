import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/Models/Forum';
import { Post } from 'src/app/Models/Post';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.css']
})
export class ForsideComponent implements OnInit {
  forumtest: Forum[];
  forum = new Forum;
  posttest: Post[];
  endpointf = '/Forumer';
  endpointp = '/Posts';
  constructor(
    public restApi: RestApiService, 
  ) { }

  ngOnInit(): void {
    this.loadForum()
    // this.loadPost()
  }
  loadForum(){
    return this.restApi.getDatas(this.endpointf).subscribe((forum) => {
      this.forumtest = forum;
    })
  }
  loadPost(){
    return this.restApi.getDatas(this.endpointp).subscribe((post) => {
      this.posttest = post;
    })
  }
}