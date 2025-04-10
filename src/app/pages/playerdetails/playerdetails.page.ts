import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonGrid, IonToolbar, IonCard, IonButtons, IonButton, IonIcon, IonCardContent, IonRow, IonCol, IonList, IonItem, IonLabel, IonNote, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Player } from 'src/app/models/player.model';
import { ShareService } from 'src/app/services/share.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.page.html',
  styleUrls: ['./playerdetails.page.scss'],
  imports: [IonBackButton, IonCol, IonRow, IonCardContent, IonGrid, IonIcon, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PlayerdetailsPage implements OnInit {
  player?: Player;
  favorites:  Player[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private favoriteService: FavoriteService,
    public shareService: ShareService
  ) {}
  

  ngOnInit() { 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.player = this.apiService.players.find(p => p.id === id);

    this.favoriteService.favorites$.subscribe({
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
    this.favoriteService.toggleFavorite(player).subscribe({
      error: err => console.error('Error al alternar favorito', err)
    });
  }
}
