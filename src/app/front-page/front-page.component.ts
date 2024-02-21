import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [
    LoginComponent,
    SignupComponent,
    RouterOutlet
  ],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss'
})
export class FrontPageComponent {

}
