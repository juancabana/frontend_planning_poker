import { Injectable } from '@angular/core';
import { SignUpParameters } from './interfaces/SignUpParameters.interface';
import { signUp, type SignInInput, signIn, signOut, getCurrentUser, confirmSignUp, ConfirmSignUpInput } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async handleSignUp ({password, email, name}: SignUpParameters) {
    try {
      const response = await signUp({
        username: email,
        password,
        options: { userAttributes: { name } }
      });
      return response
    } catch (error) {
      console.log('error signing up:', error);
      return error
    }
  }

  async currentAuthenticatedUser() {
    try {
      const userInfo = await getCurrentUser();
      return userInfo
    } catch (err) {
      console.log(err);
      return false
    }
  }

  async handleSignIn({ username, password }: SignInInput) {
    try {
      const response = await signIn({ username, password });
      return response
    } catch (error) {
    // TODO Lanzar modal que diga que no se pudo hacer el login por algunos problemas
      console.log(error)
      throw new Error()
    }
  }

  async handleSignUpConfirmation({ username, confirmationCode }: ConfirmSignUpInput) {
    try {
      const response = await confirmSignUp({
        username,
        confirmationCode
      });
      // { isSignUpComplete, nextStep }
      return response
    } catch (error) {
      console.log('error confirming sign up', error);
      return error
    }
  }

  async handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
