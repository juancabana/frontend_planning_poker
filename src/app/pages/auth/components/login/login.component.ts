import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}

  public loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(4)
    ]],
  });

  logingWithCognito() {
    console.log(this.loginForm.controls.password.errors)
  }
}
