import { EventSideComponent } from './event-page/event-side.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForsideComponent } from './front-page/forside.component';
import { CertifikatComponent } from './certificate/certifikat.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SletProfilComponent } from './delete-profil/slet-profil.component';
import { RedigerOlComponent } from './update-beer/rediger-ol.component';
import { OpretteOlComponent } from './creation-beer/oprette-ol.component';
import { ProfilComponent } from './profil/profil.component';
import { KatalogComponent } from './katalog/katalog.component';
import { SamarbejdeSideComponent } from './cooperation-page/samarbejde-side.component';
import { SamarbejdeOprettelseComponent } from './cooperation-creation/samarbejde-oprettelse.component';
import { SamarbejdeRedigerComponent } from './cooperation-update/samarbejde-rediger.component';

const routes: Routes = [
  {path:'', component:ForsideComponent},
  {path:'main', component:ForsideComponent},
  {path:'event', component:EventSideComponent},
  {path:'certifikat', component:CertifikatComponent},
  {path:'profil', component:ProfilComponent},
  {path:'sletprofil', component:SletProfilComponent},
  {path:'redigerol/:id', component:RedigerOlComponent},
  {path:'opretteol', component:OpretteOlComponent},
  {path:'katalog', component:KatalogComponent},
  {path:'samarbejdeside', component:SamarbejdeSideComponent},
  {path:'samarbejderediger/:id', component:SamarbejdeRedigerComponent},
  {path:'samarbejdeopret', component:SamarbejdeOprettelseComponent},
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
