import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.sass'],
})
export class FormRoomComponent implements OnInit {
  public formRoom!: FormGroup;
  public isButtonActive: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly httpService: HttpService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.formRoom.get('room_name')?.valueChanges.subscribe((value) => {
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
            '(?!^d+$)(?!.*[_.*#/-])(?:[^0-9]*[0-9]){0,3}[^0-9]*'
          ),
        ],
      ],
    });
  }
  setButtonActive(): void {
    const isValid = this.formRoom.get('room_name')?.status === 'VALID';
    this.isButtonActive = isValid;
  }

  async createRoom() {
    if (this.isButtonActive) {
      this.httpService
        .createNewRoom(this.formRoom.get('room_name')?.value)
        .subscribe({
          next: (data) => {
            localStorage.setItem(
              'room',
              JSON.stringify({ ...data, isRoomValid: true })
            );
            localStorage.removeItem('user');

            this.router.navigateByUrl(`room/${data._id}`);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
    return;
  }
}
