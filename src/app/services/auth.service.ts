import { Injectable, signal } from '@angular/core';
import { NavController } from '@ionic/angular'
import { from, Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from "@angular/fire/auth";
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<User | null | undefined>(undefined)
  
  constructor(
    private firebaseAuth: Auth,
    private navCtrl: NavController
  ) { }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});

    return from(promise)
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(response => updateProfile(response.user, {displayName: username}));

    return from(promise);
  }

  logOut(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      this.navCtrl.navigateRoot('/login');
    });

    this.currentUserSig.set(null);

    return from(promise);
  }
}


