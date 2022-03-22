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
  tagsList: Tags[];
  searchkey: string;
  search: any;
  endpointT = '/Tags';
  beerid = JSON.parse(localStorage.getItem('breweryId') || '{}')
  beerList : any = {};
  constructor(
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onLoadTags()
  }

  onLoadTags() {
    return this.restApi.getDatas(this.endpointT).subscribe((tag) => {
      this.tagsList = tag;
    });
  }

  onFindBeer(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.tagsList = this.tagsList.filter(res =>{
        return res.name.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onAddTag(id:any){
    this.restApi.updateData(this.beerid, this.endpointT, this.beerList).subscribe((data) => {
      this.router.navigate(['../main/catalog'])
    });
  }
}