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
  endpointT = '/Tags';
  beerid = JSON.parse(localStorage.getItem('bryggeriId') || '{}')
  beerList : any = {};
  constructor(
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onloadTags()
  }

  onloadTags() {
    return this.restApi.getDatas(this.endpointT).subscribe((tag) => {
      this.tagsliste = tag;
    });
  }

  onFindBeer(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.tagsliste = this.tagsliste.filter(res =>{
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onAddTag(id:any){
    this.restApi.updateData(this.beerid, this.endpointT, this.beerList).subscribe((data) => {
      this.router.navigate(['../main/katalog'])
    });
  }
}