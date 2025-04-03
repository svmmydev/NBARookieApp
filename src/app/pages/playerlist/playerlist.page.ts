import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton } from '@ionic/angular/standalone';
import { PlayerListComponent } from 'src/app/components/playerlist/playerlist.component';

@Component({
  selector: 'app-playerlist-page',
  templateUrl: './playerlist.page.html',
  styleUrls: ['./playerlist.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PlayerListComponent]
})
export class PlayerlistPage implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}
