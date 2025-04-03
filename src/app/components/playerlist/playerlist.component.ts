import { Component } from '@angular/core';
import { IonItem, IonLabel, IonList, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-playerlist-component',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss'],
  imports: [IonContent, IonItem, IonLabel, IonList],
})
export class PlayerListComponent {
  players = ['esto', 'es', 'una', 'lista', 'dummy'];

}