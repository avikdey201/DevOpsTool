import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponentComponent } from './login-component/login-component.component';
import { SelectionComponentComponent } from './selection-component/selection-component.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponentComponent},
  {  path: 'description', component:  SelectionComponentComponent },
 
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
