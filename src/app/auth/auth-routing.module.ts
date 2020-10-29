import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordMailComponent } from './reset-password-mail/reset-password-mail.component';
import { ConfirmationAccountComponent } from './confirmation-account/confirmation-account.component';




const routes: Routes = [
  { path: '', component:AuthComponent , children:[
    { path: 'reset-password', component:ResetPasswordComponent},
    { path: 'forgot-password', component:ResetPasswordMailComponent},
    { path: 'confirm-account', component:ConfirmationAccountComponent}
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
