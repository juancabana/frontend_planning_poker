import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { HttpService } from '../../../../services/http-service/http-service.service';

@Component({
  selector: 'form-room',
  templateUrl: './form-room.organism.html',
  styleUrls: ['./form-room.organism.sass'],
})
export class FormRoomComponent implements OnDestroy {
  public room = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(20),
    Validators.pattern('(?!^d+$)(?!.*[()_,.*#/-])(?:[^0-9]*[0-9]){0,3}[^0-9]*'),
  ]);

  private unsubscribe$ = new Subject<void>();

  constructor( public readonly router: Router, private readonly httpService: HttpService) {}

  createRoom(): void {
    if (this.room.invalid) return;
    this.httpService.createNewRoom(this.room.value!).subscribe((data) => {
      localStorage.setItem('room', JSON.stringify(data));
      localStorage.removeItem('user');
      this.router.navigateByUrl(`room/${data._id}`);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
