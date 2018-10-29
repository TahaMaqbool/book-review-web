import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent
  ]
})
export class AuthModule {}
