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
import { ProfilComponent } from './profil/profil.component';
import { KatalogComponent } from './katalog/katalog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { SletDialogBoxComponent } from './slet-dialog-box/slet-dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    NotFoundComponent,
    EventSideComponent,
    ForsideComponent,
    CertifikatComponent,
    OlBrugerSideComponent,
    OpretteOlComponent,
    RedigerOlComponent,
    SletProfilComponent,
    ProfilComponent,
    KatalogComponent,
    SletDialogBoxComponent
  ],
  entryComponents:[SletDialogBoxComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule

  ],
  exports: [
    NotFoundComponent,
    EventSideComponent,
    ForsideComponent,
    CertifikatComponent,
    OlBrugerSideComponent,
    OpretteOlComponent,
    RedigerOlComponent,
    SletProfilComponent,
    ProfilComponent,
    KatalogComponent,
    SletDialogBoxComponent
  ]

})
export class MainModule { }
