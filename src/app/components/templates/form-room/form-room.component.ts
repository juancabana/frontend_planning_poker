import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgZone } from '@angular/core';

import { HttpService } from './../../../services/http-service/http-service.service';

@Component({
  selector: 'form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.sass'],
})
export class FormRoomComponent implements OnInit, OnDestroy {
  private formRoomSubscription: Subscription = new Subscription();
  public formRoom!: FormGroup;
  public isButtonActive: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private ngZone: NgZone,
    public readonly router: Router,
    private readonly httpService: HttpService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.subscribeValueChanges();
  }

  subscribeValueChanges() {
    this.formRoomSubscription = this.formRoom
      .get('room_name')!
      .valueChanges.subscribe(() => {
        this.setButtonActive();
      });
  }

  createForm(): void {
    this.formRoom = this.formBuilder.group({
      room_name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          Validators.pattern(
            '(?!^d+$)(?!.*[()_,.*#/-])(?:[^0-9]*[0-9]){0,3}[^0-9]*'
          ),
        ],
      ],
    });
  }

  setButtonActive(): void {
    const isValid = this.formRoom.get('room_name')?.status === 'VALID';
    this.isButtonActive = isValid;
  }

  createRoom() {
    if (this.isButtonActive) {
      this.httpService
        .createNewRoom(this.formRoom.get('room_name')!.value)
        .subscribe({
          next: (data) => {
            this.setInLocalStorage('room', JSON.stringify(data));
            localStorage.removeItem('user');
            this.navigate(`room/${data._id}`);
          },
        });
    }
    return;
  }

  setInLocalStorage(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  navigate(url: string) {
    this.ngZone.run(() => {
      this.router.navigateByUrl(url);
    });
  }

  ngOnDestroy(): void {
    this.formRoomSubscription.unsubscribe();
  }
}
