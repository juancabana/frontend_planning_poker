import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.sass'],
})
export class UserModalComponent implements OnInit, OnDestroy {
  private username: string = '';
  private getUserSubscription: Subscription = new Subscription();

  public is_button_active: boolean = false;
  public is_player: boolean = false;
  public is_spectator: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<UserModalComponent>,
    private readonly httpService: HttpService
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
    if (
      this.username.length > 0 &&
      regex.test(this.username) &&
      (this.is_player || this.is_spectator)
    ) {
      this.is_button_active = true;
    } else {
      this.is_button_active = false;
    }
  }

  createUser() {
    if (!this.is_button_active) return;

    const user: any = {
      username: this.username,
      visualization: this.is_player ? 'player' : 'spectator',
    };

    // get user data that there is in params
    const { room_id } = this.dialogRef._containerInstance._config.data;

    this.getUserSubscription = this.httpService
      .createUser({ ...user, room_id })
      .subscribe((newUser) => {
        localStorage.setItem('user', JSON.stringify(newUser));
        this.dialogRef.close();
      });
    (error: Error) => {
      console.log(error);
    };
  }

  ngOnDestroy(): void {
    this.getUserSubscription.unsubscribe();
  }
}
