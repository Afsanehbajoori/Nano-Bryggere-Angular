import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LayoutRoutingModule } from './layout-routing.module';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    ContentComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule

  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    ContentComponent
  ]
})
export class LayoutModule { }
