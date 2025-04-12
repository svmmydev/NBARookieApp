import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonToolbar, IonTitle, IonFooter, IonImg } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonImg, IonFooter, CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonToolbar,
    IonTitle,
  ]
})
export class LoginPage {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}


  /**
  * ionViewWillEnter
  * Ionic lifecycle hook triggered every time the view is about to be entered.
  * It resets the form and clears any error messages.
  */
  ionViewWillEnter() {
    this.loginForm.reset();
    this.errorMessage = null;
  }


  /**
  * loginForm
  * Reactive form group with email and password controls.
  */
  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })


  // Error message to show when login fails
  errorMessage: string | null = null;


  /**
  * onLogin
  * Triggered when the user submits the login form.
  * Sends credentials to the AuthService and navigates to /playerlist on success.
  * Displays an error message if login fails.
  */
  onLogin() {
    const form = this.loginForm.getRawValue();
    this.authService.login(form.email, form.password).
    subscribe({
      next: () => {
        this.router.navigate(['/playerlist'], { queryParams: { fromLogin: true }});
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
    });
  }
}
