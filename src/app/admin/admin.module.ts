import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTreeModule} from '@angular/material/tree';
import { AdminRoutingModule } from './admin-routing.module';
import { EventAdminSideComponent } from './event-admin-side/event-admin-side.component';
import { OlAdminSideComponent } from './ol-admin-side/ol-admin-side.component';
import { BrugerAdminSideComponent } from './bruger-admin-side/bruger-admin-side.component';
import { AdminForsideComponent } from './admin-forside/admin-forside.component';
import { BrugerCertifikatComponent } from './bruger-certifikat/bruger-certifikat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    EventAdminSideComponent,
    OlAdminSideComponent,
    BrugerAdminSideComponent,
    AdminForsideComponent,
    BrugerCertifikatComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatInputModule,
    MatTreeModule,
    MatIconModule
  ],
  exports:[
    EventAdminSideComponent,
    OlAdminSideComponent,
    BrugerAdminSideComponent,
    BrugerCertifikatComponent,
    AdminForsideComponent
  ]
})
export class AdminModule { }
