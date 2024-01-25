/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signIn, signUp } from 'aws-amplify/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent {
  constructor(public fb: FormBuilder, private router: Router) {}

  public signUpForm = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      Validators.pattern('(?!^d+$)(?!.*[()_,.*#/-])(?:[^0-9]*[0-9]){0,3}[^0-9]*')
    ]
  ],
  email: ['', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ]],
  password: ['', [
    Validators.required,
    Validators.minLength(8)
  ]]
  })

  async register() {
    if (this.signUpForm.invalid) return
    try {
      await signUp({
        username: this.signUpForm.controls.email.value!,
        password: this.signUpForm.controls.password.value!,
        options: {
          userAttributes: {
            name: this.signUpForm.controls.username.value!
          }
        }
      })
      const user = await signIn({
        username: this.signUpForm.controls.email.value!,
        password: this.signUpForm.controls.password.value!,
      });
      if (user.isSignedIn){
        this.router.navigate(['/create-room'])
      }

    } catch (error) {
      console.log(error)
    }
  }
}

