import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, ConfirmCodeComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class AuthModule {}
