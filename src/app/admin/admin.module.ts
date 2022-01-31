import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EventAdminSideComponent } from './event-admin-side/event-admin-side.component';
import { OlAdminSideComponent } from './ol-admin-side/ol-admin-side.component';
import { BrugerAdminSideComponent } from './bruger-admin-side/bruger-admin-side.component';
import { AdminForsideComponent } from './admin-forside/admin-forside.component';


@NgModule({
  declarations: [
    EventAdminSideComponent,
    OlAdminSideComponent,
    BrugerAdminSideComponent,
    AdminForsideComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports:[
    EventAdminSideComponent,
    OlAdminSideComponent,
    BrugerAdminSideComponent
  ]
})
export class AdminModule { }
