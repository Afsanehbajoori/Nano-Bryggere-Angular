import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlLagerComponent } from './ol-lager/ol-lager.component';
import { OlSideSamarbejdeComponent } from './ol-side-samarbejde/ol-side-samarbejde.component';
import { OlSideComponent } from './ol-side/ol-side.component';
import { OlSogningComponent } from './ol-sogning/ol-sogning.component';
import { OlOpskriftComponent } from './ol-opskrift/ol-opskrift.component';
import { OlLommeregnerComponent } from './ol-lommeregner/ol-lommeregner.component';

const routes: Routes = [
  {path:'' , component: OlSideComponent},
  {path:'øl-side/:id', component:OlSideComponent},
  {path:'øl-lager/:id', component:OlLagerComponent},
  {path:'øl-side-samarbejde/:id', component:OlSideSamarbejdeComponent},
  {path:'øl-opskrift', component:OlOpskriftComponent},
  {path:'øl-lommeregner', component:OlLommeregnerComponent},
  {path:'øl-søgning', component:OlSogningComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlRoutingModule { }
