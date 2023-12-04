import { Component, Input } from '@angular/core';
import { InvitePlayersModalComponent } from '../../templates/invite-players-modal/invite-players-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'header-room',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  @Input() room_name: string = '';
  name_viever: string = '';

  constructor(private dialog: MatDialog) {
    // name_viever es igual a las dos primeras letras del nombre del usuario
    const user = JSON.parse(localStorage.getItem('user')!);
    this.name_viever = user.username.substring(0, 2).toUpperCase();
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