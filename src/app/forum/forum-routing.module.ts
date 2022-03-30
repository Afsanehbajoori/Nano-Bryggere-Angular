import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForsideComponent } from './forside/forside.component';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { ForumTagsComponent } from './forum-tags/forum-tags.component';
import { OpretteComponent } from './oprette/oprette.component';


const routes: Routes = [
  {path:'',component:ForsideComponent},
  {path:'forum',component:ForsideComponent},
  {path:'forum-post', component:ForumPostComponent},
  {path:'forum-tags', component:ForumTagsComponent},
  {path:'opret-forum',component:OpretteComponent},
  // {path:'redigerslet/:id', component:RedigerSletComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
