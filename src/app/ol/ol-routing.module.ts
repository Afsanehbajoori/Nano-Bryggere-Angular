import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlSideComponent } from './ol-side/ol-side.component';
import { OlSogningComponent } from './ol-sogning/ol-sogning.component';

const routes: Routes = [
  {path:'' , component: OlSideComponent},
  {path:'olside/:id', component:OlSideComponent},
  {path:'sogning', component:OlSogningComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlRoutingModule { }
