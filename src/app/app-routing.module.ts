import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { AcceptInvitationComponent } from './accept-invitation/accept-invitation.component';
import { DeclineInvitationComponent } from './decline-invitation/decline-invitation.component';



const routes: Routes = [
  { path: '', component:WelcomeComponent},
  { path: 'auth', loadChildren:'./auth/auth.module#AuthModule'},
  { path: 'scrum', loadChildren:'./scrum/scrum.module#ScrumModule', canActivate: [AuthGuard]},
  {path: 'acceptInvitation/:id', component: AcceptInvitationComponent },
  {path: 'declineInvitation', component: DeclineInvitationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
