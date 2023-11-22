import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.sass'],
})
export class UserModalComponent {
  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}

  ngOnInit(): void {}

  onClick(): void {
    this.dialogRef.close();
  }
  closeModal(): void {
    this.dialogRef.close();
  }
}
