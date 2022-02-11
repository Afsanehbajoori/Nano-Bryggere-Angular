import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpretteComponent } from '../events/oprette/oprette.component';
import { EventkalenderSideComponent } from './eventkalender-side/eventkalender-side.component';
import { RedigerEventsComponent } from './rediger-events/rediger-events.component';

const routes: Routes = [
  {path:'',component:EventkalenderSideComponent},
  {path:'events',component:EventkalenderSideComponent},
  {path:'oprette',component:OpretteComponent},
  {path:'rediger/:id',component:RedigerEventsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
