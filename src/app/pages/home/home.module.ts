import { NgModule } from '@angular/core';
import { HomeComponent } from './home.page';
import { CommonModule } from '@angular/common';
import { FormRoomComponent } from 'src/app/components/organisms/form-room/form-room.organism';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent, FormRoomComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
})
export class HomeModule {}
