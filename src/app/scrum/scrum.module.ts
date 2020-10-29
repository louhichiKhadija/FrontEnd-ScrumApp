import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule} from '@angular/material/sidenav';

import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { HomeComponent } from './home/home.component';
import { ScrumComponent } from './scrum.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ScrumRoutingModule } from './scrum-routing.module';
import { MatCardModule, MatIconModule} from '@angular/material';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { ProjectComponent } from './project/project.component';
import { MatListModule} from '@angular/material/list';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap'
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule} from '@angular/material/select';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu'; 

import { HomeProjectComponent } from './home-project/home-project.component';
import { CreateSprintComponent } from './create-sprint/create-sprint.component';
import { ListSprintComponent } from './list-sprint/list-sprint.component';
import { EditSprintComponent } from './edit-sprint/edit-sprint.component';
import { NavBarProjectComponent } from './nav-bar-project/nav-bar-project.component';

import { MatDialogModule } from '@angular/material'



import {MatToolbarModule} from '@angular/material/toolbar'; 
import { TaskManagerComponent } from './task-manager/task-manager.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  declarations: [
    ScrumComponent,
    UpdateProfileComponent,
    UserDetailsComponent, 
    HomeComponent,
    HomeProjectComponent, 
    SidebarComponent,
    CreateSprintComponent,
    ProjectComponent,
    ListSprintComponent,
    EditSprintComponent,
    TaskManagerComponent,
    NavBarProjectComponent,
    UpdatePasswordComponent,
   
  ],
  imports: [
    ScrumRoutingModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatPasswordStrengthModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    DragDropModule, 
    ScrumRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatListModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatToolbarModule
  ],
  entryComponents: [EditSprintComponent, UpdateProfileComponent, UpdatePasswordComponent]
    
   
})
export class ScrumModule { }
