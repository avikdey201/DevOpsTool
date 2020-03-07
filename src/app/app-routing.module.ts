import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponentComponent } from './login-component/login-component.component';
import { SelectionComponentComponent } from './selection-component/selection-component.component';
import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponentComponent},
  {  path: 'select', component:  SelectionComponentComponent
  , canActivate: [AuthGuard] },
  { path: '**', component: LoginComponentComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
