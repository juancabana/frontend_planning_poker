/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: 'confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.sass'],
})
export class ConfirmCodeComponent {

  constructor(private authService: AuthService, private router: Router) {}

  public state = this.router.getCurrentNavigation()!.extras.state!
  public code = new FormControl('', [ Validators.required, Validators.pattern('^[0-9]{6,}$')])

  async confirmCode() {
    if (this.code.invalid) return
    await this.authService.handleSignUpConfirmation({
      confirmationCode: String(this.code.value!),
      username: this.state['data'].email,
    });
    await this.authService.handleSignIn({username: this.state['data'].email, password: this.state['data'].password})
    this.router.navigate(['/create-room']);
  }
}
