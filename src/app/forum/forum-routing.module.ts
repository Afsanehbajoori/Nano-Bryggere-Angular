import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForsideComponent } from './forside/forside.component';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { ForumTagsComponent } from './forum-tags/forum-tags.component';
import { OpretteComponent } from './oprette/oprette.component';
import { RedigerSletComponent } from './rediger-slet/rediger-slet.component';

const routes: Routes = [
  {path:'',component:ForsideComponent},
  {path:'forum',component:ForsideComponent},
  {path:'forumpost', component:ForumPostComponent},
  {path:'forumtags', component:ForumTagsComponent},
  {path:'oprette',component:OpretteComponent},
  {path:'redigerslet/:id', component:RedigerSletComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
