import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonGrid, IonToolbar, IonCard, IonButtons, IonButton, IonIcon, IonCardContent, IonRow, IonCol, IonList, IonItem, IonLabel, IonNote, IonBackButton, IonImg } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Player } from 'src/app/models/player.model';
import { ShareService } from 'src/app/services/share.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.page.html',
  styleUrls: ['./playerdetails.page.scss'],
  imports: [IonImg, IonBackButton, IonCol, IonRow, IonCardContent, IonGrid, IonIcon, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PlayerdetailsPage implements OnInit {
  player?: Player;  // Player details to display
  favorites:  Player[] = []; // List of current favorites

  
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private favoriteService: FavoriteService,
    public shareService: ShareService
  ) {}
  

  /**
  * ngOnInit
  * Angular lifecycle hook that runs when the component is initialized.
  * - Retrieves the player ID from the route parameters
  * - Finds the matching player from the API service
  * - Subscribes to the list of favorites
  */
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


  /**
  * Checks if a given player is currently marked as favorite.
  * 
  * @param player - The player to check
  * @returns true if the player is a favorite
  */
  isFavorite(player: Player): boolean {
    return this.favorites.some(fav => fav.id == player.id);
  }


  /**
  * Toggles a player as favorite or not.
  * Calls the favoriteService to update the list in local storage or Firestore.
  * 
  * @param player - The player to toggle
  */
  toggleFavorite(player: Player) {
    this.favoriteService.toggleFavorite(player).subscribe({
      error: err => console.error('Error al alternar favorito', err)
    });
  }
}
