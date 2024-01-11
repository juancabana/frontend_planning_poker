import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { InvitePlayersModalComponent } from '../../organisms/invite-players-modal/invite-players-modal.organism';

@Component({
  selector: 'header',
  templateUrl: './header.molecule.html',
  styleUrls: ['./header.molecule.sass'],
})
export class HeaderComponent implements OnInit {
  @Input() public roomName: string = '';
  public username: string = '';

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.username = user?.username;
  }

  openDialog(): void {
    this.dialog.open(InvitePlayersModalComponent, {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'custom-invitation-modal',
      backdropClass: 'blur-backdrop',
    });
  }
}
