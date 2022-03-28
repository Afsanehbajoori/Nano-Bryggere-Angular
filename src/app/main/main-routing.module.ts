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
  {path:'certifikat', component:CertifikatComponent},
  {path:'profil', component:ProfilComponent},
  {path:'sletprofil', component:SletProfilComponent},
  {path:'updateol/:id', component:RedigerOlComponent},
  {path:'opretol', component:OpretteOlComponent},
  {path:'katalog', component:KatalogComponent},
  {path:'samarbejdeside', component:SamarbejdeSideComponent},
  {path:'samarbejdeopdater/:id', component:SamarbejdeRedigerComponent},
  {path:'samarbejdeopretning', component:SamarbejdeOprettelseComponent},
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
