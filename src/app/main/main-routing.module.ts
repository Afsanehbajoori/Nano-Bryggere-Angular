import { EventSideComponent } from './event-side/event-side.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForsideComponent } from './forside/forside.component';
import { CertifikatComponent } from './certifikat/certifikat.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SletProfilComponent } from './slet-profil/slet-profil.component';
import { RedigerOlComponent } from './rediger-ol/rediger-ol.component';
import { OpretteOlComponent } from './oprette-ol/oprette-ol.component';
import { ProfilComponent } from './profil/profil.component';
import { KatalogComponent } from './katalog/katalog.component';
import { SamarbejdeSideComponent } from './samarbejde-side/samarbejde-side.component';
import { SamarbejdeOprettelseComponent } from './samarbejde-oprettelse/samarbejde-oprettelse.component';
import { SamarbejdeRedigerComponent } from './samarbejde-rediger/samarbejde-rediger.component';

const routes: Routes = [
  {path:'', component:ForsideComponent},
  {path:'main', component:ForsideComponent},
  {path:'event', component:EventSideComponent},
  {path:'certificate', component:CertifikatComponent},
  {path:'profile', component:ProfilComponent},
  {path:'deleteprofil', component:SletProfilComponent},
  {path:'updatebeer/:id', component:RedigerOlComponent},
  {path:'createbeer', component:OpretteOlComponent},
  {path:'catalog', component:KatalogComponent},
  {path:'cooperationpage', component:SamarbejdeSideComponent},
  {path:'cooperationupdate/:id', component:SamarbejdeRedigerComponent},
  {path:'cooperationcreation', component:SamarbejdeOprettelseComponent},
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
