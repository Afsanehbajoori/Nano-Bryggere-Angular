import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../main/not-found/not-found.component';
import { AdminForsideComponent } from './admin-forside/admin-forside.component';
import { AdminOpretTagComponent } from './admin-opret-tag/admin-opret-tag.component';
import { AdminRedigerTagComponent } from './admin-rediger-tag/admin-rediger-tag.component';
import { AdminTagsComponent } from './admin-tags/admin-tags.component';
import { BrugerAdminSideComponent } from './bruger-admin-side/bruger-admin-side.component';
import { BrugerCertifikatComponent } from './bruger-certifikat/bruger-certifikat.component';
import { EventAdminSideComponent } from './event-admin-side/event-admin-side.component';
import { OlAdminSideComponent } from './ol-admin-side/ol-admin-side.component';

const routes: Routes = [
  {path:'',component:AdminForsideComponent},
  {path:'admin',component:AdminForsideComponent},
  {path:'bruger-admin', component:BrugerAdminSideComponent},
  {path:'event-admin',component:EventAdminSideComponent},
  {path:'øl-admin',component:OlAdminSideComponent},
  {path:'certifikat', component:BrugerCertifikatComponent},
  {path:'tags-admin', component:AdminTagsComponent},
  {path: 'tags-opret-admin', component:AdminOpretTagComponent},
  {path: 'tags-rediger-admin', component:AdminRedigerTagComponent},
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }