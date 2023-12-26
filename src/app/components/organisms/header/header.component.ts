import { Component, Input, OnInit } from '@angular/core';
import { InvitePlayersModalComponent } from '../../templates/invite-players-modal/invite-players-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  @Input() public roomName: string = '';
  public username: string = '';

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.username = user?.username;
  }

  openDialog() {
    this.dialog.open(InvitePlayersModalComponent, {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'custom-invitation-modal',
      backdropClass: 'blur-backdrop',
    });
  }
}
