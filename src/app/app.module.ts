import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HomeModule } from './pages/home/home.module';
import { RoomModule } from './pages/room/room.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './pages/auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, AppRoutingModule, HomeModule, RoomModule, RouterModule, AuthModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
