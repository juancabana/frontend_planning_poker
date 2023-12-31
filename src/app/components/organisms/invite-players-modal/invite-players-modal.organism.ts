import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'invite-players-modal',
  templateUrl: './invite-players-modal.organism.html',
  styleUrls: ['./invite-players-modal.organism.sass'],
})
export class InvitePlayersModalComponent {
  public actualUrl: string = this.platformLocation.href;

  constructor(
    private readonly dialogRef: MatDialogRef<InvitePlayersModalComponent>,
    private readonly platformLocation: PlatformLocation,
    private readonly clipboard: Clipboard
  ) {}

  copyLink() {
    this.clipboard.copy(this.actualUrl);
    this.closeModal();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
