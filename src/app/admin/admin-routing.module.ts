import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminForsideComponent } from './admin-forside/admin-forside.component';
import { BrugerAdminSideComponent } from './bruger-admin-side/bruger-admin-side.component';
import { EventAdminSideComponent } from './event-admin-side/event-admin-side.component';
import { OlAdminSideComponent } from './ol-admin-side/ol-admin-side.component';

const routes: Routes = [
  {path:'',component:AdminForsideComponent},
  {path:'admin',component:AdminForsideComponent},
  {path:'brugeradmin', component:BrugerAdminSideComponent},
  {path:'eventadmin',component:EventAdminSideComponent},
  {path:'oladmin',component:OlAdminSideComponent}
  // {path:'brugeradminrediger',component:OlAdminSideComponent},
  // {path:'oladminrediger',component:OlAdminSideComponent},
  // {path:'eventadminrediger',component:OlAdminSideComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
