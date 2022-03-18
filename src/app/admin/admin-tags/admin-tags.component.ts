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
  tagslist: Tags[];
  endpointT = '/Tags';
  searchkey: string;
  constructor(
    public restApi: RestApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onloadTags()
  }
  onloadTags() {
    return this.restApi.getDatas(this.endpointT).subscribe((tag) => {
      this.tagslist = tag;
    });
  }
  onCreateTags() {
    this.router.navigate(['../admin/tagsadmin']);
  }
  onUpdateTags(id:any) {
    this.router.navigate(['../admin/tagsadmin']);
  }
  onDeleteTags(id:any) {
    return this.restApi.deleteData(id,this.endpointT).subscribe((tag) => {
      this.tagslist = tag;
    });
  }
  onFindBeer(){
    if(this.searchkey == ""){
      this.ngOnInit();
    }
    else{
      this.tagslist = this.tagslist.filter(res =>{
        return res.navn.toLowerCase().match(this.searchkey.toLowerCase());
      })
    }
  }
}
