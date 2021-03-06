import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpretteComponent } from '../events/oprette/oprette.component';
import { EventkalenderSideComponent } from './eventkalender-side/eventkalender-side.component';
import { MineEventsComponent } from './mine-events/mine-events.component';
import { RedigerEventsComponent } from './rediger-events/rediger-events.component';

const routes: Routes = [
  {path:'',component:EventkalenderSideComponent},
  {path:'events',component:EventkalenderSideComponent},
  {path:'mine-events', component:MineEventsComponent},
  {path:'opret-event',component:OpretteComponent},
  {path:'rediger-event/:id',component:RedigerEventsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
