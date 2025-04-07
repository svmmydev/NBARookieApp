import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player.model';
import { map } from 'rxjs';
import { mapApiPlayerToPlayer } from '../mappers/player.mapper';
import { doc, Firestore, writeBatch } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  players: Player[] = [];
  
  readonly API_URL = 'https://api.balldontlie.io/v1/players';
  readonly API_AUTH_TOKEN = '1b4f8895-a5dc-44a2-8e67-17b56727328f';
  
  constructor(
    private http: HttpClient,
    private firestore: Firestore
  ) { }

  getPlayers(cursor: number | null, perPage: number = 25) {
    const url = cursor
    ? `${this.API_URL}?per_page=${perPage}&cursor=${cursor}`
    : `${this.API_URL}?per_page=${perPage}`;

    return this.http.get<any>(url, {
      headers: {
        'Authorization': this.API_AUTH_TOKEN
      }
    }).pipe(
      map(response => ({
        players: response.data.map((apiPlayer: any) => mapApiPlayerToPlayer(apiPlayer)),
        nextCursor: response.meta?.next_cursor ?? null
      }))
    );
  }

  storePlayersInFirestore(players: Player[]): Promise<void> {
    const batch = writeBatch(this.firestore);

    players.forEach(player => {
      const playerRef = doc(this.firestore, 'players', player.id.toString());
      batch.set(playerRef, player, { merge: true });
    });

    return batch.commit();
  }
}
