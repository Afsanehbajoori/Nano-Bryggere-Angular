import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OlRoutingModule } from './ol-routing.module';
import { OlSogningComponent } from './ol-sogning/ol-sogning.component';
import { OlSideComponent } from './ol-side/ol-side.component';
import { OlLagerComponent } from './ol-lager/ol-lager.component';
import { OlSideSamarbejdeComponent } from './ol-side-samarbejde/ol-side-samarbejde.component';
import { OlLommeregnerComponent } from './ol-lommeregner/ol-lommeregner.component';
import { OlOpskriftComponent } from './ol-opskrift/ol-opskrift.component';

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
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    OlSideComponent,
    OlSogningComponent,
    OlLagerComponent,
    OlSideSamarbejdeComponent,
    OlLommeregnerComponent,
    OlOpskriftComponent
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
    MatGridListModule,
    MatIconModule
    ]
})
export class OlModule { }
