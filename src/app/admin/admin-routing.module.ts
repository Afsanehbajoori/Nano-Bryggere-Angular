import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../main/not-found/not-found.component';
import { AdminForsideComponent } from './admin-forside/admin-forside.component';
import { AdminTagsComponent } from './admin-tags/admin-tags.component';
import { BrugerAdminSideComponent } from './bruger-admin-side/bruger-admin-side.component';
import { BrugerCertifikatComponent } from './bruger-certifikat/bruger-certifikat.component';
import { EventAdminSideComponent } from './event-admin-side/event-admin-side.component';
import { OlAdminSideComponent } from './ol-admin-side/ol-admin-side.component';

const routes: Routes = [
  {path:'',component:AdminForsideComponent},
  {path:'admin',component:AdminForsideComponent},
  {path:'useradmin', component:BrugerAdminSideComponent},
  {path:'eventadmin',component:EventAdminSideComponent},
  {path:'beeradmin',component:OlAdminSideComponent},
  {path:'certificate', component:BrugerCertifikatComponent},
  {path:'tagsadmin', component:AdminTagsComponent},
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }