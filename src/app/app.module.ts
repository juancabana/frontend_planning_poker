import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './pages/room/room.page';
import { HomeComponent } from './pages/home/home.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRoomComponent } from './components/organisms/form-room/form-room.organism';
import { HeaderComponent } from './components/molecules/header/header.molecule';
import { CardComponent } from './components/molecules/card/card.molecule';
import { LogoComponent } from './components/atoms/logo/logo.atom';
import { InvitePlayersModalComponent } from './components/organisms/invite-players-modal/invite-players-modal.organism';

import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModalComponent } from './components/templates/user-modal/user-modal.template';
import { MatDialogModule } from '@angular/material/dialog';
import { optionsCards } from './components/organisms/options-cards/options-cards.organism';
import { ResultsComponent } from './components/organisms/results/results.organism';
import { AdminModalComponent } from './components/templates/admin-modal/admin-modal.template';
import { ButtonSubmitComponent } from './components/atoms/button-submit/button-submit.atom';
import { CommonModule } from '@angular/common';
import { ShortNamePipe } from './pipes/short-name.pipe';
import { AverageFormatPipe } from './pipes/average-format.pipe';

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
    AdminModalComponent,
    ButtonSubmitComponent,
    ShortNamePipe,
    AverageFormatPipe,
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
  bootstrap: [AppComponent],
})
export class AppModule {}
