import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonSubmitComponent } from '../components/atoms/button-submit/button-submit.atom';
import { LogoComponent } from '../components/atoms/logo/logo.atom';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ButtonSubmitComponent, LogoComponent],
  imports: [CommonModule, RouterModule],
  exports: [ButtonSubmitComponent, LogoComponent],
})
export class SharedModule {}
