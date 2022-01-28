import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForsideComponent } from './forside/forside.component';
import { RedigerSletComponent } from './rediger-slet/rediger-slet.component';
import { OpretteComponent } from './oprette/oprette.component';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { ForumTagsComponent } from './forum-tags/forum-tags.component';


@NgModule({
  declarations: [
    ForsideComponent,
    RedigerSletComponent,
    OpretteComponent,
    ForumPostComponent,
    ForumTagsComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule
  ],
  exports:[
    ForsideComponent,
    RedigerSletComponent,
    OpretteComponent,
    ForumPostComponent,
    ForumTagsComponent
  ]
})
export class ForumModule { }
