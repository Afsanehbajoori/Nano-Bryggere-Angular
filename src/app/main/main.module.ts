import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ScrollingModule} from '@angular/cdk/scrolling';

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
import { SletDialogBoxComponent } from './slet-dialog-box/slet-dialog-box.component';
import { RedigerProfilDialogBoxComponent } from './rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { RedigerBryggeriDialogBoxComponent } from './rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { CertifikatDialogBoxComponent } from './certifikat-dialog-box/certifikat-dialog-box.component';
import { SamarbejdeSideComponent } from './samarbejde-side/samarbejde-side.component';
import { SamarbejdeOprettelseComponent } from './samarbejde-oprettelse/samarbejde-oprettelse.component';
import { SamarbejdeRedigerComponent } from './samarbejde-rediger/samarbejde-rediger.component';
import { VisDetajlerComponent } from './vis-detajler/vis-detajler.component';
import { VisOlDetajlerComponent } from './vis-ol-detajler/vis-ol-detajler.component';
import { VisEventsDetajlerComponent } from './vis-events-detajler/vis-events-detajler.component';

import { SamarbejdeVisningComponent } from './samarbejde-visning/samarbejde-visning.component';
import { SamarbejdeKatalogComponent } from './samarbejde-katalog/samarbejde-katalog.component';
import { VisSamarbejdeSideComponent } from './vis-samarbejde-side/vis-samarbejde-side.component';
import { OpretSamarbejdeOlDialogBoxComponent } from './opret-samarbejde-ol-dialog-box/opret-samarbejde-ol-dialog-box.component';
import { OpdaterSamarbejdeOlDialogBoxComponent } from './opdater-samarbejde-ol-dialog-box/opdater-samarbejde-ol-dialog-box.component';
import { SamarbejdeOlLagerComponent } from './samarbejde-ol-lager/samarbejde-ol-lager.component';
import { RapportSideComponent } from './rapport-side/rapport-side.component';
import { VisSamarbejdeAnsogningsSideComponent } from './vis-samarbejde-ansognings-side/vis-samarbejde-ansognings-side.component';
import { OpretRapportDialogBoxComponent } from './opret-rapport-dialog-box/opret-rapport-dialog-box.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { OlOpskriftComponent } from './ol-opskrift/ol-opskrift.component';
import { OlLommeregnerComponent } from './ol-lommeregner/ol-lommeregner.component';



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
    SletDialogBoxComponent,
    RedigerProfilDialogBoxComponent,
    RedigerBryggeriDialogBoxComponent,
    CertifikatDialogBoxComponent,
    SamarbejdeSideComponent,
    SamarbejdeOprettelseComponent,
    SamarbejdeRedigerComponent,
    VisDetajlerComponent,
    VisOlDetajlerComponent,
    VisEventsDetajlerComponent,
    SamarbejdeVisningComponent,
    SamarbejdeKatalogComponent,
    VisSamarbejdeSideComponent,
    OpretSamarbejdeOlDialogBoxComponent,
    OpdaterSamarbejdeOlDialogBoxComponent,
    SamarbejdeOlLagerComponent,
    RapportSideComponent,
    VisSamarbejdeAnsogningsSideComponent,
    OpretRapportDialogBoxComponent,
    OlOpskriftComponent,
    OlLommeregnerComponent
  ],
  entryComponents:[SletDialogBoxComponent , RedigerProfilDialogBoxComponent , RedigerBryggeriDialogBoxComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatTreeModule,
    ScrollingModule
  ],
  providers:[
    {provide:MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue : {duration:2500}}
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
    SletDialogBoxComponent,
    RedigerProfilDialogBoxComponent,
    RedigerBryggeriDialogBoxComponent
  ]
})
export class MainModule { }
