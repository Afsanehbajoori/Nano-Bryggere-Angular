import { LoginSideComponent } from './login/login-side/login-side.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'' , component: LoginSideComponent},
  {path:'login' , loadChildren :() =>import('./login/login.module').then(mod => mod.LoginModule)},
  {path:'main' , loadChildren :() => import('./main/main.module').then(mod => mod.MainModule)},
  {path:'admin' , loadChildren : () => import('./admin/admin.module').then(mod => mod.AdminModule)},
  {path:'events' , loadChildren : () => import('./events/events.module').then(mod => mod.EventsModule)},
  {path:'forum' , loadChildren : () => import('./forum/forum.module').then(mod => mod.ForumModule)},
  {path:'ol' , loadChildren : () => import('./ol/ol.module').then(mod => mod.OlModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
