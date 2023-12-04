import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'invite-players-modal',
  templateUrl: './invite-players-modal.component.html',
  styleUrls: ['./invite-players-modal.component.sass'],
})
export class InvitePlayersModalComponent {
  urlActual: string = this.platformLocation.href;

  constructor(
    private dialogRef: MatDialogRef<InvitePlayersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private platformLocation: PlatformLocation,
    private clipboard: Clipboard
  ) {}

  onClick(): void {
    this.dialogRef.close();
  }

  copyLink() {
    this.clipboard.copy(this.urlActual);
    this.closeModal();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
