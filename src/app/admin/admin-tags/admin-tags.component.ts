import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tags } from 'src/app/Models/Tags';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-admin-tags',
  templateUrl: './admin-tags.component.html',
  styleUrls: ['./admin-tags.component.css']
})
export class AdminTagsComponent implements OnInit {
  tagsliste: Tags[];
  endpointT = '/Tags';
  searchkey: string;
  constructor(
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onHentTags()
  }
  onHentTags() {
    return this.restApi.getDatas(this.endpointT).subscribe((tag) => {
      this.tagsliste = tag;
    });
  }
  onOpretTags() {
    this.router.navigate(['../admin/tagsadmin']);
  }
  onOpdaterTags(id:any) {
    this.router.navigate(['../admin/tagsadmin']);
  }
  onSletTags(id:any) {
    return this.restApi.deleteData(id,this.endpointT).subscribe((tag) => {
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
}
