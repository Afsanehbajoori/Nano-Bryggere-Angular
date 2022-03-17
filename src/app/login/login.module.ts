import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginSideComponent } from './login-side/login-side.component';
import { RegistrerComponent } from './registrer/registrer.component';
import { GlemtPasswordComponent } from './glemt-password/glemt-password.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { RedigerSletBrugerComponent } from './rediger-slet-bruger/rediger-slet-bruger.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';




@NgModule({
  declarations: [
    LoginSideComponent,
    RegistrerComponent,
    GlemtPasswordComponent,
    EditPasswordComponent,
    RedigerSletBrugerComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    MatSelectModule

  ],
  
  exports:[
    EditPasswordComponent,
    GlemtPasswordComponent,
    RedigerSletBrugerComponent,
    RegistrerComponent,
    LoginSideComponent
  ]
})
export class LoginModule { }
