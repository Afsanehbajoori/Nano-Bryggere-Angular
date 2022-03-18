import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventSideComponent } from './event-page/event-side.component';
import { ForsideComponent } from './front-page/forside.component';
import { CertifikatComponent } from './certificate/certifikat.component';
import { OlBrugerSideComponent } from './beer-user-page/ol-bruger-side.component';
import { OpretteOlComponent } from './creation-beer/oprette-ol.component';
import { RedigerOlComponent } from './update-beer/rediger-ol.component';
import { SletProfilComponent } from './delete-profil/slet-profil.component';
import { ProfilComponent } from './profil/profil.component';
import { KatalogComponent } from './katalog/katalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SletDialogBoxComponent } from './delete-dialog-box/slet-dialog-box.component';
import { RedigerProfilDialogBoxComponent } from './update-profil-dialog-box/rediger-profil-dialog-box.component';
import { RedigerBryggeriDialogBoxComponent } from './update-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import { CertifikatDialogBoxComponent } from './certificate-dialog-box/certifikat-dialog-box.component';
import { SamarbejdeSideComponent } from './cooperation-page/samarbejde-side.component';
import { SamarbejdeOprettelseComponent } from './cooperation-creation/samarbejde-oprettelse.component';
import { SamarbejdeRedigerComponent } from './cooperation-update/samarbejde-rediger.component';
import { VisDetajlerComponent } from './show-details/vis-detajler.component';
import { VisOlDetajlerComponent } from './show-beer-detail/vis-ol-detajler.component';
import { VisEventsDetajlerComponent } from './show-events-details/vis-events-detajler.component';

import {MatProgressBarModule} from '@angular/material/progress-bar';
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
import {ScrollingModule} from '@angular/cdk/scrolling';
import { SamarbejdeVisningComponent } from './cooperation-show/samarbejde-visning.component';
import { RedigerSamarbejdeDialogBoxComponent } from './update-cooperation-dialog-box/rediger-samarbejde-dialog-box.component';


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
    RedigerSamarbejdeDialogBoxComponent
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
