import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlLagerComponent } from './ol-lager/ol-lager.component';
import { OlSideComponent } from './ol-side/ol-side.component';
import { OlSogningComponent } from './ol-sogning/ol-sogning.component';

const routes: Routes = [
  {path:'' , component: OlSideComponent},
  {path:'ol-side/:id', component:OlSideComponent},
  {path:'ol-lager/:id', component:OlLagerComponent},
  {path:'ol-sogning', component:OlSogningComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlRoutingModule { }
