import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { HttpService } from './../../../services/http-service/http-service.service';

import { NewUser } from './interfaces/new-user.interface';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.sass'],
})
export class UserModalComponent implements OnInit, OnDestroy {
  private getUserSubscription: Subscription = new Subscription();

  public username: string = '';
  public isButtonActive: boolean = false;
  public isPlayer: boolean = false;
  public isSpectator: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<UserModalComponent>,
    private readonly httpService: HttpService
  ) {}

  ngOnInit(): void {}

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
      this.isPlayer = true;
      this.isSpectator = false;
    } else if (target.id === 'spectator') {
      this.isSpectator = true;
      this.isPlayer = false;
    }
    this.setButtonActive();
  }

  setButtonActive(): void {
    const validateLength = this.username.length >= 5 && this.username.length <= 20;
    const regex = /^(?!.*[()_,.*#/-])(\D*\d){0,3}\D*$/;
    if ( validateLength && regex.test(this.username) && (this.isPlayer || this.isSpectator)) {
      this.isButtonActive = true
    } else {
      this.isButtonActive = false
    }
  }

  createUser() {
    if (!this.isButtonActive) return;

    const user: NewUser = {
      username: this.username,
      visualization: this.visualization()
    };

    // get user data that there is in params
    const { room_id } = this.dialogRef._containerInstance._config.data;

    this.getUserSubscription = this.httpService
      .createUser({ ...user, room_id })
      .subscribe((newUser) => {
        this.setLocalStorage('user', JSON.stringify(newUser));
        this.closeModal()
      });
  }

  setLocalStorage(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  visualization () { return this.isPlayer ? 'player' : 'spectator'}

  ngOnDestroy(): void {
    this.getUserSubscription.unsubscribe();
  }
}
