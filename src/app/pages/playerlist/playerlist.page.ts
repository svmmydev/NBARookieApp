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
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonButtons,
  IonInfiniteScroll,
  IonInfiniteScrollContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.page.html',
  styleUrls: ['./playerlist.page.scss'],
  imports: [IonCol, IonRow, IonGrid, IonButtons,
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
  @ViewChild(IonContent, { static: false }) content?: IonContent;

  firstLoad = false;
  cursor:number | null = null;
  perPage= 25;
  authSub: Subscription | undefined;
  imageUrl: string | undefined;

  constructor(
    public apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private cameraService: CameraService,
    private activatedRoute: ActivatedRoute,
    public shareService: ShareService
  ) { }

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

  ionViewWillEnter() {
    const queryParams = this.activatedRoute.snapshot.queryParams;

    if (queryParams['fromLogin'] === 'true') {
      this.firstLoad = true;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { fromLogin: null },
        queryParamsHandling: 'merge'
      });
    } else {
      this.firstLoad = false;
    }
  }

  ionViewDidEnter() {
    if (this.firstLoad) {
      this.content?.scrollToTop(300);
      this.firstLoad = false;
    }
  }

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

  loadMore(event: CustomEvent) {
    this.loadPlayers(event);
  }

  goToDetails(playerId: number) {
    this.router.navigate(['/playerdetails', playerId]);
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  async takePicture() {
    this.imageUrl = await this.cameraService.takePicture();
  }
}
