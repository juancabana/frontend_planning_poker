import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { HomeComponent } from './home/home.component';
import { WebSocketService } from './web-socket.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRoomComponent } from './components/form-room/form-room.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [AppComponent, RoomComponent, HomeComponent, FormRoomComponent, FormUserComponent, HeaderComponent, CardComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [WebSocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
