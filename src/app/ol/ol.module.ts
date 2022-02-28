import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OlRoutingModule } from './ol-routing.module';
import { OlSogningComponent } from './ol-sogning/ol-sogning.component';
import { OlSideComponent } from './ol-side/ol-side.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    OlSideComponent,
    OlSogningComponent
  ],
  imports: [
    CommonModule,
    OlRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule
    ]
})
export class OlModule { }
