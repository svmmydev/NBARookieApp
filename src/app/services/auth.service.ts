import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser$ = new BehaviorSubject<User | null>(null);
  
  constructor() { 
    const savedUser = localStorage.getItem('loggedUser');
    if (savedUser) {
      this.currentUser$.next(JSON.parse(savedUser));
    }

    const savedUsers = localStorage.getItem('registeredUser');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }
}


