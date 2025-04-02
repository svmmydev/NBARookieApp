import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonHeader, IonToolbar, IonTitle} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      console.log('Registro:', name, email, password);
      // Aquí puedes llamar a tu AuthService o guardar en localStorage
    }
  }
}
