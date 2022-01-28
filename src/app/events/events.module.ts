import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { EventkalenderSideComponent } from './eventkalender-side/eventkalender-side.component';
import { OpretteComponent } from './oprette/oprette.component';


@NgModule({
  declarations: [
    EventkalenderSideComponent,
    OpretteComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule
  ],
  exports : [
    EventkalenderSideComponent,
    OpretteComponent
  ]
})
export class EventsModule { }
