import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'admin-modal',
  templateUrl: './admin-modal.template.html',
  styleUrls: ['./admin-modal.template.sass'],
})
export class AdminModalComponent {
  public idUserSelected: string = '';
  public isButtonEnabled: boolean = false;
  public idThisUser: string = JSON.parse(localStorage.getItem('user')!)._id;

  constructor(
    private dialogRef: MatDialogRef<AdminModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User[]
  ) {}

  submitAdminData(): void {
    if (this.idUserSelected.length == 0) return
      this.dialogRef.close(this.idUserSelected);

  }

  setUserAdmin(idUser: string): void {
    this.idUserSelected = idUser;
    this.checkButton();
  }

  checkButton(): void {
    if (this.idUserSelected.length == 0) return
    this.isButtonEnabled = true;
  }
}
