import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from './../../../interfaces/user.interface';

@Component({
  selector: 'admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.sass'],
})
export class AdminModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AdminModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User[]
  ) {}
  public idUserSelected: string = '';
  public isButtonEnabled: boolean = false;
  public idThisUser: string = JSON.parse(localStorage.getItem('user')!)._id;

  submitAdminData() {
    if (this.idUserSelected.length !== 0) {
      this.dialogRef.close(this.idUserSelected);
    }
  }

  setUserAdmin(idUser: string) {
    this.idUserSelected = idUser;
    this.checkButton();
  }

  checkButton() {
    if (this.idUserSelected.length !== 0) {
      this.isButtonEnabled = true;
    }
  }
}
