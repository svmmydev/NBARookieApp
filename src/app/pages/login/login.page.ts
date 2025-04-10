import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonHeader, IonToolbar, IonTitle} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle
  ]
})
export class LoginPage {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  errorMessage: string | null = null;

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
