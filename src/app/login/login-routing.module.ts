import { EditPasswordComponent } from './edit-password/edit-password.component';
import { LoginSideComponent } from './login-site/login-side.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrerComponent } from './registrer/registrer.component';
import { GlemtPasswordComponent } from './forgot-password/glemt-password.component';
import { RedigerSletBrugerComponent } from './update-delete-bruger/rediger-slet-bruger.component';
import { NotFoundComponent } from '../main/not-found/not-found.component';


const routes: Routes = [
      {path:'',component:LoginSideComponent},
      {path:'login',component: LoginSideComponent},
      {path:'registrer',component:RegistrerComponent},
      {path:'glemtpassword',component:GlemtPasswordComponent},
      {path:'editpassword',component:EditPasswordComponent},
      {path:'redigersletbruger',component:RedigerSletBrugerComponent},
      {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
