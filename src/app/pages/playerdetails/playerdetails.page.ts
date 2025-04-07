import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonButtons, IonButton, IonIcon, IonCardContent} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Player } from 'src/app/models/player.model';
import { FavStateService } from 'src/app/services/fav-state.service';

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.page.html',
  styleUrls: ['./playerdetails.page.scss'],
  imports: [IonCardContent, IonIcon, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PlayerdetailsPage implements OnInit {
  player?: Player;
  favorites:  Player[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private favStateService: FavStateService,
  ) {}
  

  ngOnInit() { 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.player = this.apiService.players.find(p => p.id === id);

    this.favStateService.favorites$.subscribe({
      next: favs => {
        this.favorites = favs;
      },
      error: err => console.error('Error en la suscripción de favoritos', err)
    });
  }

  isFavorite(player: Player): boolean {
    return this.favorites.some(fav => fav.id == player.id);
  }

  toggleFavorite(player: Player) {
    this.favStateService.toggleFavorite(player).subscribe({
      error: err => console.error('Error al alternar favorito', err)
    });
  }
}
