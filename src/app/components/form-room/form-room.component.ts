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
  public form_room!: FormGroup;
  public is_button_active: boolean = false;
  public responseData: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.form_room.get('room_name')?.valueChanges.subscribe((value) => {
      this.setButtonActive(value);
    });
  }

  createForm(): void {
    this.form_room = this.formBuilder.group({
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

  // save() {
  //   console.log(this.form_room);
  // }

  setButtonActive(value: string): void {
    // const val = parseInt(value);
    // console.log(typeof val);
    const is_valid = this.form_room.get('room_name')?.status === 'VALID';
    this.is_button_active = is_valid;
  }
  private async roomExists(): Promise<boolean> {
    return true;
  }

  async createRoom() {
    if (this.is_button_active) {
      // TODO check if room exists
      // if (await !this.roomExists()) {

      // Ejecutar esto después de 5 segundos
      this.httpService
        .createNewRoom(this.form_room.get('room_name')?.value)
        .subscribe({
          next: (data) => {
            this.responseData = data;
            // alert('room created');
            this.router.navigateByUrl(`room/${data._id}`);
            // alert('last room created');
            console.log(this.responseData);
          },
          error: (error) => {
            console.log(error);
          },
        });
      // } else {
      //   alert('room exists');
      // }
    }
    return;
  }
}
