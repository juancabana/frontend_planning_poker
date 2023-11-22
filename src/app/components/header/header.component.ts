import { Component } from '@angular/core';
import { InvitePlayersModalComponent } from '../invite-players-modal/invite-players-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'header-room',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(InvitePlayersModalComponent, {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'custom-invite-modal',
      backdropClass: 'blur-backdrop',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
