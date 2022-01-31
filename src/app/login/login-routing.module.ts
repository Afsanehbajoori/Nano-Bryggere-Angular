import { EditPasswordComponent } from './edit-password/edit-password.component';
import { LoginSideComponent } from './login-side/login-side.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrerComponent } from './registrer/registrer.component';
import { GlemtPasswordComponent } from './glemt-password/glemt-password.component';
import { RedigerSletBrugerComponent } from './rediger-slet-bruger/rediger-slet-bruger.component';


const routes: Routes = [
      {path:'',component:LoginSideComponent},
      {path:'login',component: LoginSideComponent},
      {path:'registrer',component:RegistrerComponent},
      {path:'glemtpassword',component:GlemtPasswordComponent},
      {path:'editpassword',component:EditPasswordComponent},
      {path:'redigersletbruger',component:RedigerSletBrugerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
