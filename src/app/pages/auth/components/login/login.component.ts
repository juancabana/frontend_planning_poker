import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signIn,  } from 'aws-amplify/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router) {}

  public loginForm = this.fb.group({
    email: [ '', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async logingWithCognito() {
    try {
      const user = await signIn({
        username: this.loginForm.controls.email.value!,
        password: this.loginForm.controls.password.value!,
      });
      if (user.isSignedIn) {
        console.log(user)
        console.log('login success');
        this.router.navigate(['/create-room']);
      }
    } catch (error: any) {
      if (error.name === 'UserAlreadyAuthenticatedException') {
        console.log('login success from exception');
        // this.router.navigate(['/sign-up']);
        return;
      }
    }
  }
}
