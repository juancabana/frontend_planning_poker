/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const isAutenticated = await this.authService.currentAuthenticatedUser();
    if (isAutenticated) this.router.navigate(['/create-room']);
  }

  public signUpForm = this.fb.group({
    username: [ '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern( '(?!^d+$)(?!.*[()_,.*#/-])(?:[^0-9]*[0-9]){0,3}[^0-9]*'),
      ]],
    email: [ '', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async register() {
    if (this.signUpForm.invalid) return;
    try {
      const res = (await this.authService.handleSignUp({
        email: this.signUpForm.controls.email.value!,
        password: this.signUpForm.controls.password.value!,
        name: this.signUpForm.controls.username.value!,
      })) as any;

      if (res.nextStep.signUpStep === 'CONFIRM_SIGN_UP')
        this.router.navigate(['/confirm-code'], {state: {data: {
      ...res.nextStep,
      username: this.signUpForm.controls.username.value,
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value
    }}})

    } catch (error) {
      console.log(error);
    }
  }

  async login() {
    await this.authService.handleSignIn({
      username: this.signUpForm.controls.email.value!,
      password: this.signUpForm.controls.password.value!,
    });
  }
}
