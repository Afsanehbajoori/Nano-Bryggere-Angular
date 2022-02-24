import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tags } from 'src/app/Models/Tags';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-forum-tags',
  templateUrl: './forum-tags.component.html',
  styleUrls: ['./forum-tags.component.css']
})
export class ForumTagsComponent implements OnInit {
  tag: Tags;
  tags: any;
  tagsliste: Tags[];
  searchkey: string;
  search: any;
  endpoints = '/Tags';
  beerid = JSON.parse(localStorage.getItem('bryggeriId') || '{}')
  olList : any = {};
  constructor(
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTags()
  }

  loadTags() {
    return this.restApi.getDatas(this.endpoints).subscribe((tag) => {
      this.tagsliste = tag;
    });
  }

  onFindOl(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.tagsliste = this.tagsliste.filter(res =>{
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onTilfojTag(id:any){
    this.restApi.updateData(this.beerid, this.endpoints, this.olList).subscribe((data) => {
      this.router.navigate(['../main/katalog'])
    });
  }
}
