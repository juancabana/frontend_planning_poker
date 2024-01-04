import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from '../../../services/http-service/http-service.service';

@Component({
  selector: 'form-room',
  templateUrl: './form-room.organism.html',
  styleUrls: ['./form-room.organism.sass'],
})
export class FormRoomComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public formRoom!: FormGroup;
  public isButtonActive: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private ngZone: NgZone,
    public readonly router: Router,
    private readonly httpService: HttpService
  ) {}

  ngOnInit() {
    this.createForm();
    this.subscribeValueChanges();
  }

  subscribeValueChanges() {
    this.formRoom
      .get('room_name')!
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
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
        .subscribe((data) => {
          localStorage.setItem('room', JSON.stringify(data));
          localStorage.removeItem('user');
          this.navigate(`room/${data._id}`);
        });
    }
    return;
  }

  navigate(url: string) {
    this.ngZone.run(() => {
      this.router.navigateByUrl(url);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
