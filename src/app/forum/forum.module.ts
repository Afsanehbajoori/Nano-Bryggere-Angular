import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ForumRoutingModule } from './forum-routing.module';
import { ForsideComponent } from './forside/forside.component';
import { OpretteComponent } from './oprette/oprette.component';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { ForumTagsComponent } from './forum-tags/forum-tags.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdatePostDialogBoxComponent } from './update-post-dialog-box/update-post-dialog-box.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdateForumDialogBoxComponent } from './update-forum-dialog-box/update-forum-dialog-box.component';

@NgModule({
  declarations: [
    ForsideComponent,
    OpretteComponent,
    ForumPostComponent,
    ForumTagsComponent,
    UpdatePostDialogBoxComponent,
    UpdateForumDialogBoxComponent,
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports:[
    ForsideComponent,
    OpretteComponent,
    ForumPostComponent,
    ForumTagsComponent,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ForumModule { }
