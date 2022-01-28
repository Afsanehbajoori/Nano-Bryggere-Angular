import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginSideComponent } from './login-side/login-side.component';
import { RegistrerComponent } from './registrer/registrer.component';
import { GlemtPasswordComponent } from './glemt-password/glemt-password.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { RedigerSletBrugerComponent } from './rediger-slet-bruger/rediger-slet-bruger.component';


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
    LoginRoutingModule
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
