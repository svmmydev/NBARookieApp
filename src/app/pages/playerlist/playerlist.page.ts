import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonButtons,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import { Player } from 'src/app/models/player.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.page.html',
  styleUrls: ['./playerlist.page.scss'],
  imports: [IonButtons,
    IonIcon,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonList,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInfiniteScroll,
    IonInfiniteScrollContent]
})
export class Playerlist implements OnInit {
  cursor:number | null = null;
  perPage= 25;

  constructor(public apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers(event?: CustomEvent) {
    this.apiService.getPlayers(this.cursor, this.perPage).subscribe({
      next: ({players, nextCursor}) => {
        this.apiService.players = [...this.apiService.players, ...players];
        this.cursor = nextCursor;

        if (event) {
          const infiniteScroll = event.target as HTMLIonInfiniteScrollElement;
          infiniteScroll.complete();
          if (!nextCursor) infiniteScroll.disabled = true;
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  loadMore(event: CustomEvent) {
    this.loadPlayers(event);
  }

  goToDetails(playerId: number) {
    this.router.navigate(['/playerdetails', playerId]);
  }
}
