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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SletDialogBoxComponent } from './slet-dialog-box/slet-dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RedigerProfilDialogBoxComponent } from './rediger-profil-dialog-box/rediger-profil-dialog-box.component';
import { RedigerBryggeriDialogBoxComponent } from './rediger-bryggeri-dialog-box/rediger-bryggeri-dialog-box.component';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';

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
    RedigerBryggeriDialogBoxComponent
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

    MatSnackBarModule,


    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule
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
