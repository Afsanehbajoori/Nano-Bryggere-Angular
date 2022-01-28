import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventSideComponent } from './event-side/event-side.component';
import { ForsideComponent } from './forside/forside.component';
import { CertifikatComponent } from './certifikat/certifikat.component';
import { OlBrugerSideComponent } from './ol-bruger-side/ol-bruger-side.component';
import { OpretteOlComponent } from './oprette-ol/oprette-ol.component';
import { RedigerOlComponent } from './rediger-ol/rediger-ol.component';
import { SletProfilComponent } from './slet-profil/slet-profil.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    EventSideComponent,
    ForsideComponent,
    CertifikatComponent,
    OlBrugerSideComponent,
    OpretteOlComponent,
    RedigerOlComponent,
    SletProfilComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports: [
    NotFoundComponent,
    EventSideComponent,
    ForsideComponent,
    CertifikatComponent,
    OlBrugerSideComponent,
    OpretteOlComponent,
    RedigerOlComponent,
    SletProfilComponent
  ]

})
export class MainModule { }
