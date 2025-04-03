import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonHeader, IonToolbar, IonTitle} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
    IonTitle
  ]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    console.log(JSON.parse(localStorage.getItem('registeredUsers')!));
  }


  onLogin() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;

      this.authService.login(email, password).subscribe(success => {
        if (success) {
          this.router.navigateByUrl('/dashboard');
          console.log('Login con:', email, password);
        } else {
          alert('Email o contraseña incorrectos');
        }
      });
    }
  }


  resetApp() {
    localStorage.clear();
    console.log('localStorage reseteado');
  }
}
