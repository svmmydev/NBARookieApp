import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonItem, IonInput, IonButton, IonHeader, IonToolbar, IonTitle} from '@ionic/angular/standalone';
import { AuthService, User } from 'src/app/services/auth.service';

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
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);


  registerForm!: FormGroup;


  constructor() {}


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
      const {name, email, password, confirmPassword} = this.registerForm.value;

      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      
      const user: User = {name, email, password};

      this.auth.register(user).subscribe(success => {
        if (success) {
          alert('Registro correcto. Ahora puedes iniciar sesión.');
          console.log('Registro:', name, email, password);
          this.router.navigateByUrl('/login');
        } else {
          alert('El usuario ya existe.');
        }
      });
    }
  }
}
