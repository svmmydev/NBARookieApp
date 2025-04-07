import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDocs, setDoc } from '@angular/fire/firestore';
import { Player } from '../models/player.model';
import { from, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavStoreService {

  constructor(
    private fireStore: Firestore,
    private authService: AuthService
  ) { }

  addFavorite(player: Player): Observable<void> {
    const user = this.authService.currentUserSig();

    if (!user) throw new Error('Usuario no autenticado');

    const favPlayer = doc(this.fireStore, `users/${user.uid}/favorites`, player.id.toString());
    return from(setDoc(favPlayer, player, { merge: true }));
  }

  removeFavorite(player: Player): Observable<void> {
    const user = this.authService.currentUserSig();

    if (!user) throw new Error('Usuario no autenticado');

    const favPlayer = doc(this.fireStore, `users/${user.uid}/favorites`, player.id.toString());
    return from(deleteDoc(favPlayer));
  }

  getFavorites(): Observable<Player[]> {
    const user = this.authService.currentUserSig();

    if (!user) throw new Error('Usuario no autenticado');

    const favCollection = collection(this.fireStore, `users/${user.uid}/favorites`);
    return from(getDocs(favCollection)).pipe(
      map(snapshot => snapshot.docs.map(doc => doc.data() as Player))
    );
  }
}
