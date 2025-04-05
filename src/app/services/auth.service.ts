import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
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
    if (savedUser) this.currentUser$.next(JSON.parse(savedUser));

    const savedUsers = localStorage.getItem('registeredUsers');
    if (savedUsers) this.users = JSON.parse(savedUsers);
  }

  register(user: User): Observable<boolean> {
    const exists = this.users.find(u => u.email === user.email);
    if (exists) return of(false);
    
    this.users.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(this.users));
    return of(true);
  }

  login(email: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) return of(false);

    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.currentUser$.next(user);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.currentUser$.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUser$.value !== null;
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }
}


