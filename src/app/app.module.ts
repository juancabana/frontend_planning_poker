import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './pages/room/room.component';
import { HomeComponent } from './pages/home/home.component';
import { WebSocketService } from './services/web-socket/web-socket.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRoomComponent } from './components/form-room/form-room.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonHomeComponent } from './components/button-home/button-home.component';

import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HomeComponent,
    FormRoomComponent,
    FormUserComponent,
    HeaderComponent,
    CardComponent,
    LogoComponent,
    ButtonHomeComponent,
    NotFoundComponent,
    UserModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
