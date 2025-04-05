import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonButtons, IonButton, IonIcon, IonList, IonCardHeader, IonCardTitle, IonItem, IonCardSubtitle, IonCardContent, IonNote } from '@ionic/angular/standalone';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Player } from 'src/app/models/player.model';
import { Playerlist } from '../playerlist/playerlist.page';

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.page.html',
  styleUrls: ['./playerdetails.page.scss'],
  imports: [IonNote, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonIcon, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PlayerdetailsPage implements OnInit {
  player?: Player;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}
  

  ngOnInit() { 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.player = this.apiService.players.find(p => p.id === id);
  }
}
