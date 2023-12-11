import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './pages/room/room.component';
import { HomeComponent } from './pages/home/home.component';
import { WebSocketService } from './services/web-socket/web-socket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRoomComponent } from './components/templates/form-room/form-room.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { CardComponent } from './components/molecules/card/card.component';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { InvitePlayersModalComponent } from './components/templates/invite-players-modal/invite-players-modal.component';

import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModalComponent } from './components/templates/user-modal/user-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { optionsCards } from './components/organisms/options-cards/options-cards.component';
import { ResultsComponent } from './components/organisms/results/results.component';
import { WelcomeComponent } from './components/molecules/welcome/welcome.component';
import { AdminModalComponent } from './components/templates/admin-modal/admin-modal.component';
import { ButtonSubmitComponent } from './components/atoms/button-submit/button-submit.component';
import { CommonModule } from '@angular/common';
import { CardOptionComponent } from './components/molecules/card-option/card-option.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HomeComponent,
    FormRoomComponent,
    HeaderComponent,
    CardComponent,
    LogoComponent,
    NotFoundComponent,
    UserModalComponent,
    InvitePlayersModalComponent,
    optionsCards,
    ResultsComponent,
    WelcomeComponent,
    AdminModalComponent,
    ButtonSubmitComponent,
    CardOptionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
