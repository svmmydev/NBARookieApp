import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonItem, IonInput, IonButton, IonToolbar, IonTitle, IonFooter, IonImg, IonText } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [ 
    IonImg,
    IonFooter, 
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonToolbar,
    IonTitle
  ]
})
export class RegisterPage {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}


  /**
  * Reactive registration form with validators.
  * Includes username, email, password and password confirmation.
  */
  registerForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, { validators: this.matchPasswords });


  // Error message to display when registration fails or form is invalid
  errorMessage: string | null = null;


  /**
  * onRegister
  * Handles form submission for user registration.
  * Validates matching passwords, required fields, and submits to AuthService.
  */
  onRegister() {
    this.errorMessage = null;

    if (this.registerForm.invalid) {
      // Show error message depending on which validation failed
      if (this.registerForm.errors?.['passwordsMismatch']) {
        this.errorMessage = 'Las contraseñas no coinciden';
      } else {
        this.errorMessage = 'Rellena todos los campos';
      }
      this.registerForm.markAllAsTouched(); // Show errors on all fields
      return;
    }

    // Extract form values
    const form = this.registerForm.getRawValue() as {
      email: string;
      userName: string;
      password: string;
    };

    // Call AuthService to register the user
    this.authService.register(form.email, form.userName, form.password)
    .subscribe({
      next: () => {
        // Navigate to home or login after successful registration
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.errorMessage = err.code; // Show Firebase error code
      }
    });
  }


  /**
  * matchPasswords
  * Custom validator to check if `password` and `confirmPassword` fields match.
  * @returns null if match, or an error object
  */
  private matchPasswords(group: any) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }
}
