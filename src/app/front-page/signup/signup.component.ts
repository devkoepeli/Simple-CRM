import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Auth } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MessageAnimationComponent } from '../../shared/components/message-animation/message-animation.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    MatTooltipModule,
    MatProgressBarModule,
    MessageAnimationComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  hide = true;
  password = '';
  email = '';
  isSigningUp = false;
  signUpResult: 'emailExists' | 'error' | 'success' | 'initial' = 'initial'

  private auth: Auth = inject(Auth);

  router = inject(Router);

  constructor() { }

  signup() {
    this.isSigningUp = true;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        this.signupSuccess();
      })
      .catch(e => {
        this.errorHandling(e);
      });
  }

  signupSuccess() {
    this.signUpResult = 'success';
    this.isSigningUp = false;

    setTimeout(() => {
      this.signUpResult = 'initial';
      this.router.navigate(['']);
    }, 2200);
  }

  errorHandling(error: TypeError) {
    if (error.message.includes('auth/email-already-in-use')) {
      this.signUpResult = 'emailExists';
      this.isSigningUp = false;
      setTimeout(() => {
        this.signUpResult = 'initial';
      }, 2200);
    } else {
      this.signUpResult = 'error';
      this.isSigningUp = false;
      setTimeout(() => {
        this.signUpResult = 'initial';
      }, 2200);
    }
  }
}
