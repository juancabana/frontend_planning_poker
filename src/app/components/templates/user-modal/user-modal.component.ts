import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { NewUser } from './interfaces/new-user.interface';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.sass'],
})
export class UserModalComponent implements OnInit, OnDestroy {
  private username: string = '';
  private getUserSubscription: Subscription = new Subscription();

  public isButtonActive: boolean = false;
  public isPlayer: boolean = false;
  public isSpectator: boolean = false;

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
      this.isPlayer = !this.isPlayer;
      this.isSpectator = false;
    } else if (target.id === 'spectator') {
      this.isSpectator = !this.isSpectator;
      this.isPlayer = false;
    }
    this.setButtonActive();
  }

  setButtonActive(): void {
    const regex = /^(?!.*[_.*#/-])(?:[^\d]*[0-9]){0,3}[^\d]*.{5,20}$/;
    if (
      this.username.length > 0 &&
      regex.test(this.username) &&
      (this.isPlayer || this.isSpectator)
    ) {
      this.isButtonActive = true;
    } else {
      this.isButtonActive = false;
    }
  }

  createUser() {
    if (!this.isButtonActive) return;

    const user: NewUser = {
      username: this.username,
      visualization: this.isPlayer ? 'player' : 'spectator',
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
