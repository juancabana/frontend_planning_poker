import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { HttpService } from '../../../services/http-service/http-service.service';
import { NewUser } from './interfaces/new-user.interface';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.template.html',
  styleUrls: ['./user-modal.template.sass'],
})
export class UserModalComponent {

  public formCreateUser = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('(?!^d+$)(?!.*[()_,.*#/-])(?:[^0-9]*[0-9]){0,3}[^0-9]*'),]],
    typeUser: ['', Validators.required]
  })

  constructor(
    private readonly dialogRef: MatDialogRef<UserModalComponent>,
    private readonly httpService: HttpService,
    private fb: FormBuilder
  ) {}

  createUser(): void {
    if (this.formCreateUser.invalid) return;
    const user: NewUser = {
      username: this.formCreateUser.value.username!,
      visualization: this.formCreateUser.value.typeUser!
    };
    const { room_id } = this.dialogRef._containerInstance._config.data;
    this.httpService.createUser({ ...user, room_id }).subscribe((newUser) => {
      localStorage.setItem('user', JSON.stringify(newUser));
      this.dialogRef.close();
    });
  }

}
