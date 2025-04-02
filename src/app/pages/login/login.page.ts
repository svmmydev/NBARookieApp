import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonInputPasswordToggle, IonIcon } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon
  ]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      console.log('Login con:', email, password);
    }
  }
}
