import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDocs, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { BehaviorSubject, from, Observable, tap } from 'rxjs';
import { Player } from '../models/player.model';
import { Auth, user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FavStateService {
  private _favorites$ = new BehaviorSubject<Player[]>([]);
  public favorites$ = this._favorites$.asObservable();

  constructor(
      private fireStore: Firestore,
      private authService: AuthService,
      private auth: Auth
  ) { 
    user(this.auth).subscribe(currentUser => {
      if (currentUser) {
        const favCollection = collection(this.fireStore, `users/${currentUser.uid}/favorites`);
        getDocs(favCollection)
          .then(snapshot => {
            const favorites = snapshot.docs.map(doc => doc.data() as Player);
            this._favorites$.next(favorites);
          })
          .catch(err => console.error('Error al cargar favoritos', err));
      } else {
        this._favorites$.next([]);
      }
    });
  }

  loadFavorites(): void {
    const user = this.authService.currentUserSig();

    if (!user) return;

    const favCollection = collection(this.fireStore, `users/${user.uid}/favorites`);

    getDocs(favCollection)
      .then(snapshot => {
        const favorites = snapshot.docs.map(doc => doc.data() as Player);
        this._favorites$.next(favorites);
      })
      .catch(err => console.error('Error al cargar favoritos', err));
  }

  addFavorite(player: Player): Observable<void> {
    const user = this.authService.currentUserSig();
    
    if (!user) throw new Error('Usuario no autenticado');

    const favDocRef = doc(this.fireStore, `users/${user.uid}/favorites`, player.id.toString());
    
    return from(setDoc(favDocRef, player, { merge: true })).pipe(
      tap(() => {
        const current = this._favorites$.getValue();
        if (!current.find(fav => fav.id === player.id)) {
          this._favorites$.next([...current, player]);
        }
      })
    );
  }

  removeFavorite(playerId: number): Observable<void> {
    const user = this.authService.currentUserSig();
    
    if (!user) throw new Error('Usuario no autenticado');

    const favDocRef = doc(this.fireStore, `users/${user.uid}/favorites`, playerId.toString());
    
    return from(deleteDoc(favDocRef)).pipe(
      tap(() => {
        const current = this._favorites$.getValue();
        this._favorites$.next(current.filter(fav => fav.id !== playerId));
      })
    );
  }

  toggleFavorite(player: Player): Observable<void> {
    const isFav = this._favorites$.getValue().some(fav => fav.id === player.id);
    return isFav ? this.removeFavorite(player.id) : this.addFavorite(player);
  }
}
