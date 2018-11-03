import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ResetPasswordComponent
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent
  ]
})
export class AuthModule {}
