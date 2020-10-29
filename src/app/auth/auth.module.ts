import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; 
import {MatDividerModule} from '@angular/material/divider'; 

import { ResetPasswordMailComponent } from './reset-password-mail/reset-password-mail.component';

import { MatchValueDirective } from '../directives/must-match.directive';
import { MatDialogModule } from '@angular/material'

import { MatCardModule } from '@angular/material/card';
import { ConfirmationAccountComponent } from './confirmation-account/confirmation-account.component';






@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ResetPasswordMailComponent,
    MatchValueDirective,
    ConfirmationAccountComponent],

  imports: [
    AuthRoutingModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,

    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule
  ],
  entryComponents: [LoginComponent,RegisterComponent],
})
export class AuthModule { }
