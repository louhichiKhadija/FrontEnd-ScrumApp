import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScrumComponent } from './scrum.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeProjectComponent } from './home-project/home-project.component';
import { ProjectComponent } from './project/project.component';
import { HomeComponent } from './home/home.component';
import { CreateSprintComponent } from './create-sprint/create-sprint.component';
import { ListSprintComponent } from './list-sprint/list-sprint.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';



const routes: Routes = [
  { path:'', component:ScrumComponent, children:[
      {path:'home', component:HomeComponent},
      {path:'update-profile', component:UpdateProfileComponent},
      {path:'user-details', component:UserDetailsComponent},
      {path:'home-project', component:HomeProjectComponent},
      { path: 'projects', component: ProjectComponent },
      {path: 'project/:id/new-sprint', component: CreateSprintComponent},
      {path: 'project/:id/list-sprints', component:ListSprintComponent},
      {path:'project/:id/:idSprint/task-manager', component:TaskManagerComponent},
      {path:'project/:id/task-manager', component:TaskManagerComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrumRoutingModule { }
