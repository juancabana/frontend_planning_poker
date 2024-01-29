/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor( private fb: FormBuilder, private router: Router, private authService: AuthService ) {}

  async ngOnInit() {
    const isAutenticated = await this.authService.currentAuthenticatedUser()
    if (isAutenticated) this.router.navigate(['/create-room'])
  }

  public loginForm = this.fb.group({
    email: [ '', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async logingWithCognito() {
    if(this.loginForm.invalid) return
    const { isSignedIn } = await this.authService.handleSignIn({
      username: this.loginForm.controls.email.value!,
      password: this.loginForm.controls.password.value!
    });
    if (isSignedIn)
      this.router.navigate(['/create-room']);

  }
}
