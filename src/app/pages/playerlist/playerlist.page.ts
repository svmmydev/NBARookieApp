import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.page.html',
  styleUrls: ['./playerlist.page.scss'],
  standalone: true,
  imports: [IonButtons, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class Playerlist implements OnInit {

  constructor() {
  }

  ngOnInit() {
    
  }

}
