import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.sass'],
})
export class UserModalComponent {
  public form_user!: FormGroup;
  public is_button_active: boolean = false;
  public username: string = '';
  public is_player: boolean = false;
  public is_spectator: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {}

  onClick(): void {
    this.dialogRef.close();
  }
  closeModal(): void {
    this.dialogRef.close();
  }

  setUserName(event: Event): void {
    // this.username = value;
    const target = event.target as HTMLInputElement;
    this.username = target.value;
    this.setButtonActive();
  }
  setUserType(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.id === 'player') {
      this.is_player = !this.is_player;
      this.is_spectator = false;
    } else if (target.id === 'spectator') {
      this.is_spectator = !this.is_spectator;
      this.is_player = false;
    }
    this.setButtonActive();
  }
  setButtonActive(): void {
    const regex = /^(?!.*[_.*#/-])(?:[^\d]*[0-9]){0,3}[^\d]*.{5,20}$/;
    // const numbersFinded = this.username.match(/\d/g);
    if (
      this.username.length > 0 &&
      regex.test(this.username) &&
      // numbersFinded.length < 4 &&
      (this.is_player || this.is_spectator)
    ) {
      this.is_button_active = true;
    } else {
      this.is_button_active = false;
    }
  }
  async createUser() {
    const user: any = {
      username: this.username,
      visualization: this.is_player ? 'player' : 'spectator',
    };

    // obtener la data del usuario que se mandó en la config de este MatDialog
    const { room_id } = this.dialogRef._containerInstance._config.data;
    if (this.is_button_active) {
      this.httpService.createUser({ ...user, room_id }).subscribe({
        next: (data) => {
          console.log(data);
          localStorage.setItem('user', JSON.stringify(data));
          this.dialogRef.close(user);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
