import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  async sharePlayer(player: Player) {
    try {
      await Share.share({
        title: player.name,
        text: `Jugador: ${player.name}\n` +
              `Equipo: ${player.team}\n` +
              `Altura: ${player.height} M\n` +
              `Peso: ${player.weight} KG\n` +
              `País: ${player.country} KG\n` +
              `Dorsal: ${player.number} KG\n` +
              `Posición: ${player.position}\n`,
        dialogTitle: 'Compartir jugador',
      });
    } catch (error) {
      console.error('Error al compartir', error)
    }
  }
}
