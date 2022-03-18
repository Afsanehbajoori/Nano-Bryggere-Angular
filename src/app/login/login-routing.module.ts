import { EditPasswordComponent } from './edit-password/edit-password.component';
import { LoginSideComponent } from './login-side/login-side.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrerComponent } from './registrer/registrer.component';
import { GlemtPasswordComponent } from './glemt-password/glemt-password.component';
import { RedigerSletBrugerComponent } from './rediger-slet-bruger/rediger-slet-bruger.component';
import { NotFoundComponent } from '../main/not-found/not-found.component';


const routes: Routes = [
      {path:'',component:LoginSideComponent},
      {path:'login',component: LoginSideComponent},
      {path:'registrer',component:RegistrerComponent},
      {path:'forgotpassword',component:GlemtPasswordComponent},
      {path:'editpassword',component:EditPasswordComponent},
      {path:'updatedelete',component:RedigerSletBrugerComponent},
      {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
