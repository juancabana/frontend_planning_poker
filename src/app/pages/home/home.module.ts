import { NgModule } from '@angular/core';
import { HomeComponent } from './home.page';
import { CommonModule } from '@angular/common';
import { FormRoomComponent } from 'src/app/pages/home/components/form-room/form-room.organism';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, FormRoomComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class HomeModule {}
