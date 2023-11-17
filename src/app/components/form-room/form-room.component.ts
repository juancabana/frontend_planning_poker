import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.sass'],
})
export class FormRoomComponent implements OnInit {
  public form_room!: FormGroup;
  public is_button_active: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.form_room.get('room_name')?.valueChanges.subscribe((value) => {
      this.setButtonActive(value);
    });
  }

  createForm() {
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

  setButtonActive(value: string) {
    // const val = parseInt(value);
    // console.log(typeof val);
    const is_valid = this.form_room.get('room_name')?.status === 'VALID';
    this.is_button_active = is_valid;
  }
  createRoom() {
    this.is_button_active ? console.log('Created room') : false;
  }
}
