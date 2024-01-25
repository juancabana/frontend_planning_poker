import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonSubmitComponent } from '../components/atoms/button-submit/button-submit.atom';
import { LogoComponent } from '../components/atoms/logo/logo.atom';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../components/atoms/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ButtonSubmitComponent, LogoComponent, InputComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [ButtonSubmitComponent, LogoComponent, InputComponent],
})
export class SharedModule {}
