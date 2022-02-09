import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpretteComponent } from '../events/oprette/oprette.component';
import { EventkalenderSideComponent } from './eventkalender-side/eventkalender-side.component';

const routes: Routes = [
  {path:'',component:EventkalenderSideComponent},
  {path:'events',component:EventkalenderSideComponent},
  {path:'oprette',component:OpretteComponent},
  {path:'eventkalender',component:EventkalenderSideComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
