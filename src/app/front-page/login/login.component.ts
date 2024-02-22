import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from '@angular/fire/auth';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MessageAnimationComponent } from '../../shared/components/message-animation/message-animation.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    MatProgressBarModule,
    MessageAnimationComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  password = '';
  email = '';
  isLoggingIn = false;
  loggingResult: 'invalidCredential' | 'invalidEmail' | 'error' | 'success' | 'initial' = 'initial';

  auth = inject(Auth);
  router = inject(Router);

  login() {
    this.isLoggingIn = true;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        this.loggingSuccess();
      })
      .catch(e => {
        this.loggingError(e);
      })
  }

  loggingSuccess() {
    this.isLoggingIn = false;
    this.loggingResult = 'success';
    setTimeout(() => {
      this.loggingResult = 'initial';
      this.router.navigate(['']);
    }, 2200);
  }

  loggingError(error: TypeError) {
    if (error.message.includes('auth/invalid-credential')) {
      this.loggingResult = 'invalidCredential';
    } else if (error.message.includes('auth/invalid-email')) {
      this.loggingResult = 'invalidEmail';
    } else {
      this.loggingResult = 'error';
    }
    this.isLoggingIn = false;
  }
}
