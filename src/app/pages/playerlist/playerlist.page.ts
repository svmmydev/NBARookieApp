import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CameraService } from 'src/app/services/camera.service';
import { IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonButtons,
  IonInfiniteScroll,
  IonInfiniteScrollContent, IonGrid, IonRow, IonCol, IonFooter } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.page.html',
  styleUrls: ['./playerlist.page.scss'],
  imports: [
    IonCol, 
    IonRow, 
    IonGrid, 
    IonButtons,
    IonIcon,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
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
  @ViewChild(IonContent, { static: false }) content?: IonContent;

  firstLoad = false; // First load
  cursor:number | null = null; // Cursor for pagination (used with external API)
  perPage= 25;  // Number of players to load per page
  authSub: Subscription | undefined; // Subscription to AuthService to handle user state
  imageUrl: string | undefined; // Image URL returned from CameraService


  constructor(
    public apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private cameraService: CameraService,
    private activatedRoute: ActivatedRoute,
    public shareService: ShareService
  ) { }


  /**
  * On component initialization, subscribes to the current user.
  * If user is not authenticated, redirects to /login.
  * If authenticated, resets the players list and fetches the first batch.
  */
  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl('login');
      } else {
        this.apiService.players = [];
        this.cursor = null;
        this.loadPlayers();
      }
    });
  }


  /**
  * Ionic lifecycle hook – checks if the page was reached from login to scroll to top.
  */
  ionViewWillEnter() {
    const queryParams = this.activatedRoute.snapshot.queryParams;

    if (queryParams['fromLogin'] === 'true') {
      this.firstLoad = true;

      // Remove the query param after use
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { fromLogin: null },
        queryParamsHandling: 'merge'
      });
    } else {
      this.firstLoad = false;
    }
  }


  /**
  * After the view is fully entered, scrolls to the top if just logged in.
  */
  ionViewDidEnter() {
    if (this.firstLoad) {
      this.content?.scrollToTop(300);
      this.firstLoad = false;
    }
  }


  /**
  * Loads players from the API using a cursor-based pagination system.
  * Prevents duplicates and stores new players in Firestore.
  * Handles infinite scroll logic.
  */
  loadPlayers(event?: CustomEvent) {
    this.apiService.getPlayers(this.cursor, this.perPage).subscribe({
      next: ({ players, nextCursor }) => {
        const newPlayers = players.filter((p: Player) => 
          !this.apiService.players.some(existing => existing.id === p.id)
        );
        
        this.apiService.players = [...this.apiService.players, ...newPlayers];
        this.cursor = nextCursor;

        this.apiService.storePlayersInFirestore(newPlayers)
          .catch(err => console.error('Error almacenando players en Firestore', err));

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


  /**
  * Triggered by the Infinite Scroll component to load more data.
  */
  loadMore(event: CustomEvent) {
    this.loadPlayers(event);
  }


  /**
  * Navigates to the details page for a specific player.
  */
  goToDetails(playerId: number) {
    this.router.navigate(['/playerdetails', playerId]);
  }


  /**
  * Logs out the current user using AuthService.
  */
  logOut(): void {
    this.authService.logOut();
  }


  /**
  * Opens the camera and stores the returned image URL.
  */
  async takePicture() {
    this.imageUrl = await this.cameraService.takePicture();
  }


  /**
  * Unsubscribes from the AuthService when component is destroyed.
  */
  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
