import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { EventkalenderSideComponent } from './eventkalender-side/eventkalender-side.component';
import { OpretteComponent } from './oprette/oprette.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    EventkalenderSideComponent,
    OpretteComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports : [
    EventkalenderSideComponent,
    OpretteComponent
  ]
})
export class EventsModule { }
