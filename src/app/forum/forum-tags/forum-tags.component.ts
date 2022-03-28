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
  tagsListe: Tags[];
  searchkey: string;
  search: any;
  endpointT = '/Tags';
  olId = JSON.parse(localStorage.getItem('bryggeriId') || '{}')
  olListe: any = {};
  constructor(
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onHentTags()
  }

  onHentTags() {
    return this.restApi.getDatas(this.endpointT).subscribe((tag) => {
      this.tagsListe = tag;
    });
  }

  onFindOl(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.tagsListe = this.tagsListe.filter(res =>{
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }

  onTilføjTag(id:any){
    this.restApi.updateData(this.olId, this.endpointT, this.olListe).subscribe((data) => {
      this.router.navigate(['../main/catalog'])
    });
  }
}