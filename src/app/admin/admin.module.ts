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
import { AdminTagsComponent } from './admin-tags/admin-tags.component';
import { AdminOpretTagComponent } from './admin-opret-tag/admin-opret-tag.component';
import { AdminRedigerTagComponent } from './admin-rediger-tag/admin-rediger-tag.component';
import { BryggeriAdminSideComponent } from './bryggeri-admin-side/bryggeri-admin-side.component';
import { RolleAdminSideComponent } from './rolle-admin-side/rolle-admin-side.component';
import { ForumAdminSideComponent } from './forum-admin-side/forum-admin-side.component';
import {MatTabsModule} from '@angular/material/tabs';
import { OpretteEventsDialogBoxComponent } from './oprette-events-dialog-box/oprette-events-dialog-box.component';
import { UpdateEventsDialogBoxComponent } from './update-events-dialog-box/update-events-dialog-box.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    EventAdminSideComponent,
    OlAdminSideComponent,
    BrugerAdminSideComponent,
    AdminForsideComponent,
    BrugerCertifikatComponent,
    AdminTagsComponent,
    AdminOpretTagComponent,
    AdminRedigerTagComponent,
    BryggeriAdminSideComponent,
    RolleAdminSideComponent,
    ForumAdminSideComponent,
    OpretteEventsDialogBoxComponent,
    UpdateEventsDialogBoxComponent
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
