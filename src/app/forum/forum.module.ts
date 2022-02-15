import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForsideComponent } from './forside/forside.component';
import { RedigerSletComponent } from './rediger-slet/rediger-slet.component';
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

@NgModule({
  declarations: [
    ForsideComponent,
    RedigerSletComponent,
    OpretteComponent,
    ForumPostComponent,
    ForumTagsComponent
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
    MatDialogModule
  ],
  exports:[
    ForsideComponent,
    RedigerSletComponent,
    OpretteComponent,
    ForumPostComponent,
    ForumTagsComponent,
  ]
})
export class ForumModule { }
