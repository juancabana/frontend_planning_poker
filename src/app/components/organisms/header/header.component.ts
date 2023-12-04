import { Component, Input } from '@angular/core';
import { InvitePlayersModalComponent } from '../../templates/invite-players-modal/invite-players-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'header-room',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  @Input() roomName: string = '';
  nameViever: string = '';

  constructor(private dialog: MatDialog) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.nameViever = user.username.substring(0, 2).toUpperCase();
  }

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
