import { NgModule } from '@angular/core';
import { RoomComponent } from './room.page';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/molecules/header/header.molecule';
import { OptionsCards } from 'src/app/pages/room/components/options-cards/options-cards.organism';
import { ResultsComponent } from 'src/app/pages/room/components/results/results.organism';
import { CardComponent } from 'src/app/components/molecules/card/card.molecule';
import { ShortNamePipe } from 'src/app/pipes/short-name.pipe';
import { AverageFormatPipe } from 'src/app/pipes/average-format.pipe';
import { InvitePlayersModalComponent } from 'src/app/components/organisms/invite-players-modal/invite-players-modal.organism';
import { AdminModalComponent } from 'src/app/components/templates/admin-modal/admin-modal.template';
import { MatDialogModule } from '@angular/material/dialog';
import { UserModalComponent } from 'src/app/components/templates/user-modal/user-modal.template';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RoomComponent,
    HeaderComponent,
    OptionsCards,
    CardComponent,
    ResultsComponent,
    UserModalComponent,
    InvitePlayersModalComponent,
    AdminModalComponent,
    ShortNamePipe,
    AverageFormatPipe,
  ],
  imports: [CommonModule, MatDialogModule, SharedModule, ReactiveFormsModule],
})
export class RoomModule {}
