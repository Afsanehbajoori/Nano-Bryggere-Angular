import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTreeModule} from '@angular/material/tree';
import { AdminRoutingModule } from './admin-routing.module';
import { EventAdminSideComponent } from './event-admin-side/event-admin-side.component';
import { OlAdminSideComponent } from './beer-admin-side/ol-admin-side.component';
import { BrugerAdminSideComponent } from './user-admin-side/bruger-admin-side.component';
import { AdminForsideComponent } from './admin-front-page/admin-forside.component';
import { BrugerCertifikatComponent } from './user-certifikat/bruger-certifikat.component';
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
import { AdminTagsComponent } from './admin-tags/admin-tags.component';
import { BryggeriAdminSideComponent } from './bryggeri-admin-side/bryggeri-admin-side.component';
import { RolleAdminSideComponent } from './rolle-admin-side/rolle-admin-side.component';
import { ForumAdminSideComponent } from './forum-admin-side/forum-admin-side.component';
import {MatTabsModule} from '@angular/material/tabs';
import { OpretteEventsDialogBoxComponent } from './Creation-events-dialog-box/oprette-events-dialog-box.component';
import { UpdateEventsDialogBoxComponent } from './update-events-dialog-box/update-events-dialog-box.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OpretTagsDialogBoxComponent } from './creation-tags-dialog-box/opret-tags-dialog-box.component';
import { UpdateTagsDialogBoxComponent } from './update-tags-dialog-box/update-tags-dialog-box.component';

@NgModule({
  declarations: [
    EventAdminSideComponent,
    OlAdminSideComponent,
    BrugerAdminSideComponent,
    AdminForsideComponent,
    BrugerCertifikatComponent,
    AdminTagsComponent,
    BryggeriAdminSideComponent,
    RolleAdminSideComponent,
    ForumAdminSideComponent,
    OpretteEventsDialogBoxComponent,
    UpdateEventsDialogBoxComponent,
    OpretTagsDialogBoxComponent,
    UpdateTagsDialogBoxComponent
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
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports:[
    EventAdminSideComponent,
    OlAdminSideComponent,
    BrugerAdminSideComponent,
    BrugerCertifikatComponent,
    AdminForsideComponent
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule 
  ]
})
export class AdminModule { }
